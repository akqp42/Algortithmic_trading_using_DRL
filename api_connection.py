from alpaca.trading.client import TradingClient
from config import alpaca_api_key, alpaca_api_secret_key
from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockTradesRequest, StockLatestTradeRequest, StockBarsRequest
from datetime import datetime
from alpaca.data.timeframe import TimeFrame
import pandas as pd

trading_client = TradingClient(alpaca_api_key, alpaca_api_secret_key, paper=True)


try:
    account = trading_client.get_account()
    print(f"Account Number: {account.account_number}")
    print(f"Buying Power: {account.buying_power}")
except Exception as e:
    print("Error fetching account information:", e)

data_client = StockHistoricalDataClient(alpaca_api_key, alpaca_api_secret_key)
request_parameters = StockBarsRequest(symbol_or_symbols= 'AAPL',
                                        timeframe=TimeFrame.Minute,
                                        start = datetime(2018, 1, 25),
                                        end= datetime(2022, 1, 25))
    
request_parameters_daily = StockBarsRequest(symbol_or_symbols= 'AAPL',
                                        timeframe=TimeFrame.Day,
                                        start = datetime(2018, 1, 25),
                                        end= datetime(2022, 1, 25))

output_file = "AAPL_minute_data.csv"
output_file_day = "AAPL_daily_data.csv"
# try:

#     bars = data_client.get_stock_bars(request_parameters)
#     data = [
#         {
#             "Timestamp": bar.timestamp,
#             "Open": bar.open,
#             "High": bar.high,
#             "Low": bar.low,
#             "Close": bar.close,
#             "Volume": bar.volume,
#         }
#         for bar in bars["AAPL"]
#     ]
#     df = pd.DataFrame(data)
#     df.to_csv(output_file, index=False)
#     print(f"Data saved")
# except Exception as e:
#     print("error retrieving data", e)
        

try:

    bars = data_client.get_stock_bars(request_parameters)
    data = [
        {
            "Timestamp": bar.timestamp,
            "Open": bar.open,
            "High": bar.high,
            "Low": bar.low,
            "Close": bar.close,
            "Volume": bar.volume,
        }
        for bar in bars["AAPL"]
    ]
    df = pd.DataFrame(data)
    df.to_csv(output_file_day, index=False)
    print(f"Data saved")
except Exception as e:
    print("error retrieving data", e)