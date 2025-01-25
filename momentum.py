import pandas as pd
import vectorbt as vbt

file_path = "AAPL_daily_data_with_volatility_levels.csv" 
data = pd.read_csv(file_path, index_col=0, parse_dates=True)
close_prices = data['Close']
macd = vbt.MACD.run(close_prices, fast_window=12, slow_window=26, signal_window=9)


data['MACD'] = macd.macd
data['MACD_signal'] = macd.signal


data['MACD_histogram'] = data['MACD'] - data['MACD_signal']
data = data.dropna(subset=['MACD','MACD_signal','MACD_histogram'])
data.to_csv("updated_data.csv")


print(data.head())