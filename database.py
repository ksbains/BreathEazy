from os import lseek
import pymongo
import pandas as pd

#conn_str = 'mongodb+srv://sshekhar93:Cmpe295@tmcluster.wzjib.mongodb.net/IAQ-Data?retryWrites=true&w=majority'
conn_str = 'mongodb+srv://sshekhar93:Cmpe295@tmcluster.wzjib.mongodb.net/test?retryWrites=true&w=majority'

client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=5000)
db = client['IAQ-Data']

try:
    print(client.server_info)
except Exception:
    print("Unable to connect to the server")

def fetch():
    print("fetch called from models")
    cursor = db['sensors'].find()
    data = list(cursor)
    print(data[:30])
    print(len(data))
    print("Break")
    df = pd.DataFrame(data)#, columns = ['_id', 'username', 'pm2_5Data', 'pm10Data', 'tempData', 'humidityData', 'dateTimeData', '__v'])
    print(df.head())
    print(df.size)
    df.to_csv('train.csv')