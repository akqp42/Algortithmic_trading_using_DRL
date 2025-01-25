import pandas as pd


file_path = "AAPL_daily_data_with_volatility.csv" 
data = pd.read_csv(file_path, index_col=0, parse_dates=True)


data = data.dropna(subset=['Volatility'])


low_threshold = data['Volatility'].quantile(0.33)  
high_threshold = data['Volatility'].quantile(0.66)  

def classify_volatility(value, low, high):
    if value < low:
        return 'Low'
    elif value > high:
        return 'High'
    return 'Medium'


data['Volatility_Level'] = data['Volatility'].apply(classify_volatility, low=low_threshold, high=high_threshold)


output_path = "AAPL_daily_data_with_volatility_levels.csv"  
data.to_csv(output_path)


print(f"Low Volatility Threshold: {low_threshold}")
print(f"High Volatility Threshold: {high_threshold}")
print(data.head())


print(f"Updated dataset saved to: {output_path}")
