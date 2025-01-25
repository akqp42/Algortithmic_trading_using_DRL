import vectorbt as vbt
import pandas as pd
import matplotlib as plt

file = "AAPL_daily_data.csv"
data = pd.read_csv(file, index_col= 0, parse_dates= True)

ohlcv_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
if not all(col in data.columns for col in ohlcv_cols):
    raise ValueError(f"Dataset must contain the following columns: {ohlcv_cols}")

atr = vbt.ATR.run(data['High'], data['Low'], data['Close'], window=14)

data['Volatility'] = atr.atr

output_path = "AAPL_daily_data_with_volatility.csv"
data.to_csv(output_path)

print(data.head())