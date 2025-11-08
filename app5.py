from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import pandas as pd
import numpy as np
from stable_baselines3 import PPO
from datetime import datetime
import sys
import os
import json
import time

# Import your custom environment
from trading_env import TradingEnv

app = Flask(__name__)
CORS(app)

# Global variables
T_indicators = ['HA_signal', 'MACD_signal', 'MA_signal', 'OBV_signal']
MR_indicators = ['RSI_signal', 'STOCH_signal', 'BBANDS_signal', 'CCI_signal']
continuous_features = [
    'RSI', 'CMF', 'VWAP', 'ATR', 'VOLATILITY', 
    'PARKINSON', 'dist_from_high', 'dist_from_low', 'PRICE_ACTION',
    'Taker Buy Quote', 'Taker Buy Base', 'Number of Trades', 'Quote Asset Volume'
]

class TradingAnalyzer:
    """Collects info dicts from all steps and calculates metrics at the end"""
    
    def __init__(self, initial_balance=10000):
        self.initial_balance = initial_balance
        
        # Store all info dicts and metadata
        self.history = []  # List of tuples: (step, timestamp, info, reward)
        
    def record_step(self, step, timestamp, info, reward):
        """
        Record info dict from each step
        
        Args:
            step: Current step number
            timestamp: Current timestamp
            info: Complete info dict from environment
            reward: Reward from this step
        """
        self.history.append({
            'step': step,
            'timestamp': timestamp,
            'info': info,
            'reward': reward
        })
    
    def extract_trades_from_history(self):
        """
        Extract all completed trades from the stored history
        """
        trades = []
        
        for record in self.history:
            info = record['info']
            timestamp = record['timestamp']
            
            # Check if this step had position changes
            if info and 'position_changes' in info and info['position_changes']:
                position_changes = info['position_changes']
                
                # Extract closed positions (completed trades)
                if 'closed' in position_changes and position_changes['closed']:
                    for closed_pos in position_changes['closed']:
                        trade = {
                            'timestamp': timestamp,
                            'step': record['step'],
                            'entry_price': closed_pos.get('entry_price', 0),
                            'exit_price': closed_pos.get('exit_price', 0),
                            'quantity': closed_pos.get('quantity', 0),
                            'pnl': closed_pos.get('pnl', 0),
                            'pnl_percent': closed_pos.get('pnl_percent', 0),
                            'holding_period': closed_pos.get('holding_period', 0),
                            'close_reason': closed_pos.get('close_reason', 'unknown'),
                            'portfolio_value': info.get('portfolio_value', 0)
                        }
                        trades.append(trade)
        
        return trades
    
    def save_trades_to_csv(self, trades, save_dir='backtest_results'):
        """Save all trades to a CSV file with detailed information"""
        if not trades:
            print("⚠ No trades to save")
            return None
        
        os.makedirs(save_dir, exist_ok=True)
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = os.path.join(save_dir, f'trades_{timestamp}.csv')
        
        try:
            # Convert trades list to DataFrame
            trades_df = pd.DataFrame(trades)
            
            # Add trade number column at the beginning
            trades_df.insert(0, 'trade_number', range(1, len(trades_df) + 1))
            
            # Add win/loss indicator
            trades_df['win_loss'] = trades_df['pnl'].apply(
                lambda x: 'WIN' if x > 0 else 'LOSS' if x < 0 else 'BREAKEVEN'
            )
            
            # Reorder columns for better readability
            column_order = [
                'trade_number',
                'timestamp',
                'step',
                'entry_price',
                'exit_price',
                'quantity',
                'pnl',
                'pnl_percent',
                'win_loss',
                'holding_period',
                'close_reason',
                'portfolio_value'
            ]
            
            # Only include columns that exist
            existing_columns = [col for col in column_order if col in trades_df.columns]
            trades_df = trades_df[existing_columns]
            
            # Round numeric columns for better readability
            numeric_rounds = {
                'entry_price': 4,
                'exit_price': 4,
                'quantity': 6,
                'pnl': 2,
                'pnl_percent': 2,
                'portfolio_value': 2
            }
            
            for col, decimals in numeric_rounds.items():
                if col in trades_df.columns:
                    trades_df[col] = trades_df[col].round(decimals)
            
            # Save to CSV
            trades_df.to_csv(filename, index=False)
            
            print(f"✓ Trades saved to: {filename}")
            print(f"✓ Total trades exported: {len(trades_df)}")
            
            return filename
            
        except Exception as e:
            print(f"❌ Error saving trades to CSV: {str(e)}")
            import traceback
            traceback.print_exc()
            return None
    
    def calculate_metrics(self):
        """Calculate all trading metrics from the complete history"""
        
        # Extract portfolio values from history
        portfolio_values = [h['info']['portfolio_value'] for h in self.history if h['info']]
        
        # Portfolio metrics
        final_value = portfolio_values[-1] if portfolio_values else self.initial_balance
        total_return = final_value - self.initial_balance
        total_return_pct = (total_return / self.initial_balance) * 100
        
        # Extract trades
        trades = self.extract_trades_from_history()
        
        # Trade statistics
        num_trades = len(trades)
        winning_trades = [t for t in trades if t['pnl'] > 0]
        losing_trades = [t for t in trades if t['pnl'] < 0]
        
        # Win rate
        win_rate = (len(winning_trades) / num_trades * 100) if num_trades > 0 else 0.0
        
        # PnL calculations
        total_pnl = sum(t['pnl'] for t in trades) if trades else 0.0
        avg_win = np.mean([t['pnl'] for t in winning_trades]) if winning_trades else 0.0
        avg_loss = np.mean([t['pnl'] for t in losing_trades]) if losing_trades else 0.0
        
        # Profit factor
        total_wins = sum(t['pnl'] for t in winning_trades) if winning_trades else 0.0
        total_losses = abs(sum(t['pnl'] for t in losing_trades)) if losing_trades else 0.0
        profit_factor = (total_wins / total_losses) if total_losses > 0 else 0.0
        
        # Expectancy
        expectancy = (win_rate/100 * avg_win) + ((1 - win_rate/100) * avg_loss)
        
        # Close reason breakdown
        close_reasons = {}
        for trade in trades:
            reason = trade.get('close_reason', 'unknown')
            close_reasons[reason] = close_reasons.get(reason, 0) + 1
        
        # Calculate total reward
        total_reward = sum(h['reward'] for h in self.history)
        
        metrics = {
            'Initial Balance': f'${self.initial_balance:,.2f}',
            'Final Balance': f'${final_value:,.2f}',
            'Total Return': f'${total_return:,.2f}',
            'Total Return (%)': f'{total_return_pct:.2f}%',
            'Total Trades': f'{num_trades:,}',
            'Winning Trades': f'{len(winning_trades):,}',
            'Losing Trades': f'{len(losing_trades):,}',
            'Win Rate': f'{win_rate:.2f}%',
            'Total PnL': f'${total_pnl:,.2f}',
            'Avg Win': f'${avg_win:.2f}',
            'Avg Loss': f'${avg_loss:.2f}',
            'Profit Factor': f'{profit_factor:.3f}',
            'Expectancy': f'${expectancy:.2f}',
            'Total Steps': f'{len(self.history):,}',
            'Total Reward': f'{total_reward:.2f}',
            'Close Reasons': close_reasons
        }
        
        return metrics, trades
    
    def save_metrics_to_file(self, metrics, trades, save_dir='backtest_results'):
        """Save all metrics to a text file"""
        os.makedirs(save_dir, exist_ok=True)
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = os.path.join(save_dir, f'trading_metrics_{timestamp}.txt')
        
        with open(filename, 'w') as f:
            f.write("=" * 80 + "\n")
            f.write("TRADING PERFORMANCE METRICS\n")
            f.write("=" * 80 + "\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("=" * 80 + "\n\n")
            
            f.write("PORTFOLIO SUMMARY\n")
            f.write("-" * 80 + "\n")
            for key in ['Initial Balance', 'Final Balance', 'Total Return', 'Total Return (%)']:
                f.write(f"{key:.<40} {metrics[key]:>20}\n")
            f.write("\n")
            
            f.write("TRADE STATISTICS\n")
            f.write("-" * 80 + "\n")
            for key in ['Total Trades', 'Winning Trades', 'Losing Trades', 'Win Rate', 
                       'Total PnL', 'Avg Win', 'Avg Loss', 'Profit Factor', 'Expectancy']:
                f.write(f"{key:.<40} {metrics[key]:>20}\n")
            f.write("\n")
            
            f.write("EXECUTION DETAILS\n")
            f.write("-" * 80 + "\n")
            f.write(f"{'Total Steps':.<40} {metrics['Total Steps']:>20}\n")
            f.write(f"{'Total Reward':.<40} {metrics['Total Reward']:>20}\n")
            f.write("\n")
            
            # Close reasons breakdown
            if 'Close Reasons' in metrics and metrics['Close Reasons']:
                f.write("POSITION CLOSE REASONS\n")
                f.write("-" * 80 + "\n")
                for reason, count in metrics['Close Reasons'].items():
                    f.write(f"{reason:.<40} {count:>20}\n")
                f.write("\n")
            
            # Write detailed trade log
            if trades:
                f.write("\n" + "=" * 80 + "\n")
                f.write("DETAILED TRADE LOG\n")
                f.write("=" * 80 + "\n\n")
                
                for i, trade in enumerate(trades, 1):
                    f.write(f"Trade #{i}\n")
                    f.write(f"  Timestamp: {trade['timestamp']}\n")
                    f.write(f"  Step: {trade['step']}\n")
                    f.write(f"  Entry Price: ${trade['entry_price']:.4f}\n")
                    f.write(f"  Exit Price: ${trade['exit_price']:.4f}\n")
                    f.write(f"  Quantity: {trade['quantity']:.4f}\n")
                    f.write(f"  PnL: ${trade['pnl']:.2f} ({trade['pnl_percent']:.2f}%)\n")
                    f.write(f"  Holding Period: {trade['holding_period']} steps\n")
                    f.write(f"  Close Reason: {trade['close_reason']}\n")
                    f.write(f"  Portfolio Value: ${trade['portfolio_value']:.2f}\n")
                    f.write("-" * 40 + "\n")
        
        print(f"✓ Metrics saved to: {filename}")
        return filename


def live_indicators(csv_path):
    """Load and process the CSV file with technical indicators"""
    from indicators import TechnicalIndicators
    
    ti = TechnicalIndicators()
    df = ti.calculate_from_csv(csv_path)
    return df


@app.route('/api/cryptocurrencies', methods=['GET'])
def get_cryptocurrencies():
    """Return list of available cryptocurrencies"""
    try:
        cryptos = ['XRPJPY', 'LINKJPY', 'AVAXTRY', 'ADAJPY']
        return jsonify({'cryptocurrencies': cryptos})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/timerange', methods=['POST'])
def get_timerange():
    """Get min and max timestamps for selected cryptocurrency"""
    try:
        data = request.json
        crypto = data.get('crypto')
        
        if not crypto:
            return jsonify({'error': 'Cryptocurrency not specified'}), 400
        
        df = pd.read_csv('best_cluster_similar_price.csv')
        df_crypto = df[df['cryptocoin'] == crypto].copy()
        
        if df_crypto.empty:
            return jsonify({'error': f'No data found for {crypto}'}), 404
        
        df_crypto['Open Time'] = pd.to_datetime(df_crypto['Open Time'])
        min_time = df_crypto['Open Time'].min()
        max_time = df_crypto['Open Time'].max()
        
        return jsonify({
            'crypto': crypto,
            'min_timestamp': min_time.strftime('%Y-%m-%d %H:%M:%S'),
            'max_timestamp': max_time.strftime('%Y-%m-%d %H:%M:%S'),
            'total_rows': len(df_crypto)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/backtest/stream', methods=['POST'])
def run_backtest_stream():
    """Run backtest with streaming updates, calculate metrics at the end"""
    def generate():
        analyzer = None
        try:
            data = request.json
            crypto = data.get('crypto')
            start_time = data.get('start_time')
            end_time = data.get('end_time')
            
            if not all([crypto, start_time, end_time]):
                yield f"data: {json.dumps({'type': 'error', 'message': 'Missing required parameters'})}\n\n"
                return
            
            yield f"data: {json.dumps({'type': 'info', 'message': 'Loading data...'})}\n\n"
            
            df = live_indicators('best_cluster_similar_price.csv')
            df.dropna(inplace=True)
            df_crypto = df[df['cryptocoin'] == crypto].copy()
            
            if df_crypto.empty:
                yield f"data: {json.dumps({'type': 'error', 'message': f'No data found for {crypto}'})}\n\n"
                return
            
            df_crypto['Open Time'] = pd.to_datetime(df_crypto['Open Time'])
            start_dt = pd.to_datetime(start_time)
            end_dt = pd.to_datetime(end_time)
            
            df_test = df_crypto[(df_crypto['Open Time'] >= start_dt) & 
                               (df_crypto['Open Time'] <= end_dt)].copy()
            
            if df_test.empty:
                yield f"data: {json.dumps({'type': 'error', 'message': 'No data in selected time range'})}\n\n"
                return
            
            if len(df_test) < 100:
                yield f"data: {json.dumps({'type': 'error', 'message': 'Insufficient data points (need at least 100)'})}\n\n"
                return
            
            df_test = df_test.reset_index(drop=True)
            total_steps = len(df_test)
            
            yield f"data: {json.dumps({'type': 'init', 'message': 'Initializing backtest...', 'total_steps': total_steps})}\n\n"
            
            initial_balance = 10000
            test_env = TradingEnv(
                df_test, 
                T_indicators, 
                MR_indicators, 
                continuous_features, 
                initial_balance=initial_balance
            )
            
            # Initialize analyzer
            analyzer = TradingAnalyzer(initial_balance=initial_balance)
            
            yield f"data: {json.dumps({'type': 'info', 'message': 'Loading AI model...'})}\n\n"
            model = PPO.load("ppo_trading_bot_enhanced.zip")
            
            yield f"data: {json.dumps({'type': 'info', 'message': 'Starting backtest...'})}\n\n"
            
            obs, info = test_env.reset()
            done = False
            step_count = 0
            
            # Run the backtest and collect all info dicts
            while not done and step_count < total_steps:
                # Take action
                action, _ = model.predict(obs, deterministic=False)
                obs, reward, done, truncated, info = test_env.step(action)
                
                # Get current timestamp
                current_timestamp = df_test.iloc[min(step_count, len(df_test) - 1)]['Open Time'].strftime('%Y-%m-%d %H:%M:%S')
                
                # Record step in analyzer (just store the info dict)
                analyzer.record_step(
                    step=step_count,
                    timestamp=current_timestamp,
                    info=info,
                    reward=reward
                )
                
                step_count += 1
                
                # Calculate current metrics for streaming
                current_value = info['portfolio_value']
                current_pnl = current_value - initial_balance
                
                # Stream step data every 10 steps to reduce overhead
                if step_count % 10 == 0:
                    step_data = {
                        'type': 'step',
                        'step': step_count,
                        'total_steps': total_steps,
                        'portfolio_value': float(current_value),
                        'initial_balance': float(initial_balance),
                        'pnl': float(current_pnl),
                        'timestamp': current_timestamp,
                        'reward': float(reward)
                    }
                    yield f"data: {json.dumps(step_data)}\n\n"
            
            # NOW calculate all metrics from the complete history
            yield f"data: {json.dumps({'type': 'info', 'message': 'Calculating metrics from complete history...'})}\n\n"
            
            print(f"\n{'='*80}")
            print(f"Processing complete history of {len(analyzer.history)} steps...")
            print(f"{'='*80}\n")
            
            final_metrics, trades = analyzer.calculate_metrics()
            
            print(f"\n{'='*80}")
            print(f"Metrics calculated:")
            for key, value in final_metrics.items():
                if key != 'Close Reasons':
                    print(f"  {key}: {value}")
            print(f"Total trades found: {len(trades)}")
            print(f"{'='*80}\n")
            
            # Save trades to CSV
            trades_csv_file = None
            if len(trades) > 0:
                yield f"data: {json.dumps({'type': 'info', 'message': f'Saving {len(trades)} trades to CSV...'})}\n\n"
                
                trades_csv_file = analyzer.save_trades_to_csv(trades)
                
                if trades_csv_file:
                    yield f"data: {json.dumps({'type': 'info', 'message': f'Trades CSV saved to: {trades_csv_file}'})}\n\n"
                else:
                    yield f"data: {json.dumps({'type': 'warning', 'message': 'Failed to save trades CSV'})}\n\n"
            else:
                yield f"data: {json.dumps({'type': 'info', 'message': 'No trades to save to CSV (0 trades executed)'})}\n\n"
            
            # Save metrics to text file
            yield f"data: {json.dumps({'type': 'info', 'message': 'Saving metrics to file...'})}\n\n"
            
            metrics_file = analyzer.save_metrics_to_file(final_metrics, trades)
            
            yield f"data: {json.dumps({'type': 'info', 'message': f'Metrics saved to: {metrics_file}'})}\n\n"
            
            # Prepare completion data
            final_value = analyzer.history[-1]['info']['portfolio_value'] if analyzer.history else initial_balance
            total_return = ((final_value - initial_balance) / initial_balance) * 100
            total_reward = sum(h['reward'] for h in analyzer.history)
            
            completion_data = {
                'type': 'complete',
                'results': {
                    'crypto': crypto,
                    'start_time': start_time,
                    'end_time': end_time,
                    'steps': step_count,
                    'initial_balance': float(initial_balance),
                    'final_balance': float(final_value),
                    'total_pnl': float(final_value - initial_balance),
                    'total_return': round(total_return, 2),
                    'total_reward': round(total_reward, 2),
                    'num_trades': len(trades),
                    'win_rate': round((len([t for t in trades if t['pnl'] > 0]) / len(trades) * 100) if trades else 0, 2),
                    'metrics_saved': metrics_file,
                    'trades_csv_saved': trades_csv_file
                }
            }
            yield f"data: {json.dumps(completion_data)}\n\n"
        
        except Exception as e:
            import traceback
            error_trace = traceback.format_exc()
            print(error_trace)
            error_data = {
                'type': 'error',
                'message': str(e),
                'trace': error_trace
            }
            yield f"data: {json.dumps(error_data)}\n\n"
    
    return Response(
        stream_with_context(generate()),
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
            'Connection': 'keep-alive'
        }
    )


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Flask backend is running'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)