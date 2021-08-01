import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller
import pickle
from os import path
import database as db


def train():
    if not path.exists("./models/train.csv"):
        db.fetch()

    data = pd.read_csv('./models/train.csv', parse_dates=['dateTimeData'], index_col = ['dateTimeData'])
    #data.head()
    
    userData = data.loc[data['username'] == 'sshekhar93']
    
    pm25Data = userData[['pm2_5Data']]
    
    pm10Data = userData[['pm10Data']]
    
    print(pm25Data.size)
    temp25 = pd.DataFrame(pm25Data.loc[:"2021-05-13 21:41:37.798222"])
    print(temp25.size)
    
    temp10 = pd.DataFrame(pm10Data.loc[:"2021-05-13 21:41:37.798222"])
    print(temp10.size)
    
    start = pd.to_datetime("2021-05-07 15:41:55")
    index = pd.date_range(start, periods = temp25.size, freq = "30S")

    pm25DataRef = pd.DataFrame(temp25['pm2_5Data'].tolist(), index = index, columns = ['pm2_5Data'])
    print(pm25DataRef.head())
    pm10DataRef = pd.DataFrame(temp10['pm10Data'].tolist(), index = index, columns = ['pm10Data'])
    print(pm10DataRef.head())
    result25 = adfuller(pm25DataRef.pm2_5Data.dropna())
    print(f"ADF Statistic: {result25[0]}")
    print(f"p-value: {result25[1]}")
    result10 = adfuller(pm10DataRef.pm10Data.dropna())
    print(f"ADF Statistic: {result10[0]}")
    print(f"p-value: {result10[1]}")
    model25 = ARIMA(pm25DataRef.pm2_5Data, order=(5, 0, 3))
    result25 = model25.fit()
    model10 = ARIMA(pm10DataRef.pm10Data, order=(5, 0, 3))
    result10 = model10.fit()
    print(result25.summary())
    print(result10.summary())
    pickle.dump(result25,open('./models/result25.pkl','wb'))
    pickle.dump(result10,open('./models/result10.pkl','wb'))