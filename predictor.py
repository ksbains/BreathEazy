import pymongo
import pandas as pd
import pickle
from datetime import *
import time
import schedule
import os
from database import db
import json


userList = []
prediction2_5 = []
prediction10 = []


# Method to create and update userlist from database
def fetchUser():
    cursor = db['users'].find()
    users = pd.DataFrame(list(cursor))

    for index, row in users.iterrows():
        if row["dataProvider"] == True:
            userList.append(row["username"])


# Method to predict pm10 and pm2.5 values for next one hour
def generatePrediction():
    global prediction2_5
    global prediction10
    start_index = pd.Timestamp(pd.datetime.now().strftime("%Y-%m-%d %X"))
    end_index = start_index + pd.Timedelta(hours=2)
    with open('./models/result25.pkl','rb') as f_in:
        model2_5 = pickle.load(f_in)
    with open('./models/result10.pkl','rb') as f_in:
        model10 = pickle.load(f_in)
    
    prediction2_5 = list(model2_5.predict(start = start_index, end = end_index))
    prediction10 = list(model10.predict(start = start_index, end = end_index))


def storePrediction():
    tempPred10 = prediction10
    tempPred2_5 = prediction2_5
    for user in userList:
        doc = {
                        'username': user,
                        'pm10prediction': float(tempPred10[0]),
                        'pm25prediction': float(tempPred2_5[0])
                     }
        # doc = json.dumps(prediction)
        _id = db["predictions"].insert_one(doc).inserted_id
    
    if len(prediction10) != 0 and len(prediction2_5) != 0:
        prediction10.pop(0)
        prediction2_5.pop(0)


schedule.every().day.at("12:00").do(fetchUser)
schedule.every().hour.do(generatePrediction)
schedule.every(30).seconds.do(storePrediction)

fetchUser()
generatePrediction()

while 1:
    schedule.run_pending()
    time.sleep(1)