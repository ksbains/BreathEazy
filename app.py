from flask import Flask, jsonify, request
from database import client
import pandas as pd
import pickle
from os import path
import models
import json

app = Flask(__name__)


try:
    print(client.server_info())
    print("Able to connect to server")
except Exception:
    print("Unable to connect to the server")

db = client['IAQ-Data']

#Routes

@app.route('/predict', methods=['GET'])
def predict():
    start_index = pd.Timestamp(pd.datetime.now().strftime("%Y-%m-%d %X"))
    with open('./models/result25.pkl','rb') as f_in:
        model25 = pickle.load(f_in)
    with open('./models/result10.pkl','rb') as f_in:
        model10 = pickle.load(f_in)

    forecast10 = model10.predict(start = start_index, end = start_index)
    forecast25 = model25.predict(start = start_index, end = start_index)
    response = {
        'pm10prediction' : float(forecast10),
        'pm25prediction' : float(forecast25)
    }
    return jsonify(response)
     
@app.route('/fetchData')
def home():
    cursor = db['sensors'].find()
    data = list(cursor)
    df = pd.DataFrame(data)#, columns = ['_id', 'username', 'pm2_5Data', 'pm10Data', 'tempData', 'humidityData', 'dateTimeData', '__v'])
    print(df.head())
    df.to_csv('train.csv')
    # jsonString = json.dumps(data)
    return json.dumps({"data size": int(df.size)})
    # render_template('home.html')

if __name__ == "__main__":
    if not path.exists("./models/result25.pkl"):
        models.train()
    app.run(debug=True)
