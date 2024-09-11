# CRON Job to automatically ping pages and log into site to ping DB

import time
import requests

urls = [
    'https://truck-truck-go.vercel.app/',
    'https://truck-truck-go.vercel.app/shop',
    'https://truck-truck-go.vercel.app/leaderboard'
]

login_url = 'https://trucktruckgo-backend.onrender.com/login'
credentials = {
    "email": "testing@testtest.com",
    "password": "test"
}

def ping_website():
    for url in urls:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(f"Successfully pinged {url}")
            else:
                print(f"Failed to ping {url}, status code: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"Error pinging {url}: {e}")
        time.sleep(300) # wait 5 mins

def login():
    try:
        response = requests.post(login_url, json=credentials)
        
        if response.status_code == 200:
            print("Login successful!")
        else:
            print(f"Failed to log in, status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error logging in: {e}")

ping_website()
time.sleep(600) # wait 10 mins
login()