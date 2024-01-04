from datetime import datetime, timedelta
import json

def lambda_handler(event, context):
    steps = event['steps']
    results = []
    now = datetime.now()
    rounded = now - (now - datetime.min) % timedelta(minutes=60)
    results.append({'timestamp': {'S': rounded.strftime('%m/%d/%Y %H:%M')}})
    while steps > 0:
        rounded = rounded - timedelta(minutes=60)
        results.append({'timestamp': {'S': rounded.strftime('%m/%d/%Y %H:%M')}})
        steps = steps - 1
    return {
        'statusCode': 200,
        'body': json.dumps(results)
    }
