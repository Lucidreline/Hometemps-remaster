import Adafruit_DHT
import requests
from datetime import date

sensor = Adafruit_DHT.DHT11
pin = 22

humidity, temperature = Adafruit_DHT.read(sensor, pin)

fahrenheit = (temperature*(9/5)) + 32

def getTempAndHumidity():
    response = requests.post("https://hkwzbkisch.execute-api.us-west-1.amazonaws.com/Prod", 
    json={"timestamp": "1/23/23", "temperature":temperature, "humidity":humidity},
    headers={"Content-Type": "application/json"},
    )
    print(response.json())


getTempAndHumidity()

