import Adafruit_DHT
import requests
import datetime
time = datetime.datetime.now()

sensor = Adafruit_DHT.DHT11
pin = 22

humidity, temperature = Adafruit_DHT.read(sensor, pin)

fahrenheit = (temperature*(9/5)) + 32

def getTempAndHumidity():
    response = requests.post("https://hkwzbkisch.execute-api.us-west-1.amazonaws.com/Prod", 
    json={"timestamp": time.strftime('%d/%m/%Y %H:00'), "temperature":temperature, "humidity":humidity},
    headers={"Content-Type": "application/json"},
    )
    print(response.json())







getTempAndHumidity()
