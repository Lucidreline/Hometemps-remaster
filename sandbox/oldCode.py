import Adafruit_DHT
import requests
from datetime import datetime
from lastXTimestamps import lastXTimestamps

url = 'https://kzqxqmq416.execute-api.us-west-1.amazonaws.com/watIsThis/temps'
sensor = Adafruit_DHT.DHT11
pin = 4


def getTempAndHumidity():
    temperature = None
    while temperature == None:
        humidity, temperature = Adafruit_DHT.read(sensor, pin)
        if temperature == None:
            print("Got an error, trying again...")

    fahrenheit = (temperature * (9/5)) + 32
    tempAdjusted = fahrenheit - 3.5

    return [tempAdjusted, humidity]  # ajusting for accuracy


def sendSensorResults():
    sensorReading = getTempAndHumidity()
    jsonObj = {
        'temperature': sensorReading[0],
        'humidity': sensorReading[1],
        'timestamp': str(datetime.now().strftime('%m/%d/%Y %H:%M'))
    }
    responce = requests.post(url, json = jsonObj)
    print(responce.text)

def requestLastXTimestamps(x):
    responce = requests.get(url, json = lastXTimestamps(x))

def printSensorResults():
    sensorReading = getTempAndHumidity()
    jsonObj = {
        'temperature': sensorReading[0],
        'humidity': sensorReading[1],
        'timestamp': str(datetime.now().strftime('%m/%d/%Y %H:%M'))
    }
    print(lastXTimestamps(10))

sendSensorResults()
#print(getTempAndHumidity())
