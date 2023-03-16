""" Views for API Endpoints """

import os
import json
import hashlib
from dotenv import load_dotenv

from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import Driver
from .email_notifications import send_test_email

# get environment variable from .env
load_dotenv()
DB_PASS = os.getenv("DB_PASS")


def homepage(request):
    return HttpResponse("Hello World")


@api_view(["GET"])
def get_driver(request):
    """ Pulls Drivers from Users Table """

    queryset = Driver.objects.filter(role_id=3).order_by('role_id', 'sponsor_id').values('first_name', 'last_name', 'email', 'address')
    json_data = json.dumps(list(queryset))

    return HttpResponse(json_data, content_type="application/json")


@api_view(["POST"])
def signup_driver(request):
    """ Creates new Driver record from data gathered on frontend """

    if request.method == 'POST':
        # Get the form data from the JSON request body
        data = json.loads(request.body)
        password = hashlib.sha512(data['password'].encode()).hexdigest()

        print(password)

        # Create a new driver object from the form data
        try:
            user = Driver.objects.create(
                #username=data['username'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                address=data['address'],
                role_id=3,
                sponsor_id=4,
                email=data['email'],
                password=password,
            )
        except ConnectionRefusedError as error:
            print(error)
            

        print(Driver.__str__)

        # Send a welcome email to the new user
        send_test_email(user.email)

        # Return a JSON response with the new user data
        response_data = {
            #'id': user.id,
            'username': user.username,
            'email': user.email,
        }

        return JsonResponse(response_data)
