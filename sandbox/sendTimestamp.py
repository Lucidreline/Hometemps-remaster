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

humidity, temperature = Adafruit_DHT.read(sensor, pin)

fahrenheit = (temperature*(9/5)) + 32

def getTempAndHumidity():
    response = requests.post("https://hkwzbkisch.execute-api.us-west-1.amazonaws.com/Prod", 
    json={"timestamp": sys.argv[1] + "-" + date.strftime(date_format), "temperature":round(fahrenheit, 2)-8, "humidity":humidity},
    headers={"Content-Type": "application/json"},
    )
    print(response.json())

getTempAndHumidity()
