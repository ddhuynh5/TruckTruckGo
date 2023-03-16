""" Views for API Endpoints """

import os
import json
import mysql.connector
from dotenv import load_dotenv

from django.http import HttpResponse
from rest_framework.decorators import api_view
#from rest_framework.response import Response
#from rest_framework import status
#from .models import Driver
#from .serializers import DriverSerializer

# get environment variable from .env
load_dotenv()
DB_PASS = os.getenv("DB_PASS")


def homepage():
    return HttpResponse("Hello World")


@api_view(["GET"])
def get_driver(request):
    """ Pulls Drivers from Users Table """

    database = mysql.connector.connect (
        host="team10-database-instance.cobd8enwsupz.us-east-1.rds.amazonaws.com",
        user="scrummy_admin",
        password=DB_PASS
    )

    cur = database.cursor()

    print("REQ: ", request)

    cur.execute("   SELECT * FROM Team10Database.Users \
                    WHERE role_id=3 \
                    ORDER BY role_id, sponsor_id; \
                ")
    
    result = cur.fetchall()

    json_data = []
    for row in result:
        json_data.append(row)

    data = json.dumps(json_data)

    database.close()

    return HttpResponse(data, content_type="application/json")


#@api_view(["GET"])
#def 
