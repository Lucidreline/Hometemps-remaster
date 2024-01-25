import Adafruit_DHT
import requests
import sys
from datetime import datetime
from pytz import timezone
import pytz

now = datetime.now(tz=pytz.utc)
date_format='%m/%d/%Y %H:00'
#time = datetime.date(datetime.now())
date = now.astimezone(timezone('America/Los_Angeles'))

sensor = Adafruit_DHT.DHT11
pin = 22

def getTempAndHumidity():
    temp = None
    while temp == None:
        humidity, temp = Adafruit_DHT.read(sensor, pin)
        if temp == None:
             print("Senor gave me undefined, let me try again")
    fahrenheit = ((temp*(9/5)) + 32) + float(sys.argv[2])
    return [fahrenheit, humidity]

def sendTempAndHumidity():
    sensorReading = getTempAndHumidity()
    response = requests.post("https://hkwzbkisch.execute-api.us-west-1.amazonaws.com/Prod",
    json={"timestamp": sys.argv[1] + "-" + date.strftime(date_format), "temperature":round(sensorReading[0], 2)-8, "humidity":sensorReading[1]},
    headers={"Content-Type": "application/json"},
    )
    print(response.json())

sendTempAndHumidity()