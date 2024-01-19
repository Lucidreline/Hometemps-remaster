import Adafruit_DHT
import requests
from datetime import datetime
time = datetime.date(datetime.now())

sensor = Adafruit_DHT.DHT11
pin = 22

humidity, temperature = Adafruit_DHT.read(sensor, pin)

fahrenheit = (temperature*(9/5)) + 32

def getTempAndHumidity():
    response = requests.post("https://hkwzbkisch.execute-api.us-west-1.amazonaws.com/Prod", 
    json={"timestamp": time.strftime('%m/%d/%Y %H:%M'), "temperature":temperature, "humidity":humidity},
    headers={"Content-Type": "application/json"},
    )
    print(response.json())







getTempAndHumidity()
