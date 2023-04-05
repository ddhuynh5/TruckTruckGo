""" Views for API Endpoints """

import os
import json
import hashlib
from dotenv import load_dotenv

from django.http import HttpResponse, JsonResponse
from django.contrib.auth.tokens import default_token_generator
from django.utils.crypto import get_random_string
from django.urls import reverse
from django.core import serializers
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from .models import Drivers, Users
from .email_notifications import send_welcome_email, send_password_reset

# get environment variable from .env
load_dotenv()
DB_PASS = os.getenv("DB_PASS")


def validate_email(email):
    """
        Validates the email using Django's EmailValidator

        parameter - email: Email to be validated
        return - bool: true if valid, false if not
    """

    validator = EmailValidator()
    try:
        validator(email)
    except ValidationError:
        return False
    return True


@api_view(["GET"])
def get_driver(request):
    """ Pulls Drivers from Users Table """

    queryset = Drivers.objects.filter(role_id=3).order_by("role_id", "sponsor_id").values("first_name", "last_name", "email", "sponsor_id", "address")
    json_data = json.dumps(list(queryset))

    return HttpResponse(json_data, content_type="application/json")


@api_view(["GET"])
def check_password(request):
    """
        1-1 check on current password vs previous password

        parameter - request: holds user's email and password
        return - JSON:
            True: password match
            False: no match
            Error: User doesn't exist in the table
    """

    if request.method == "GET":
        try:
            email = request.GET.get("email")

            if not validate_email(email):
                return JsonResponse({"error": "Invalid email"})

            current_pass = hashlib.sha512(request.GET.get("password").encode()).hexdigest()
            prev_pass = Users.objects.filter(email=email).values("password")
            
            if current_pass == prev_pass:
                return JsonResponse({"matches": True})
            else:
                return JsonResponse({"matches": False})
        except Users.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)


@api_view(["GET"])
def login_exists(request):
    """
        Checks if the login exists in database

        parameter - request: holds user's email
        return - JSON:
            True: User exists
            False: User doesn't exist
    """

    if request.method == "GET":
        email = request.GET.get("email")

        if not validate_email(email):
            return JsonResponse({"error": "Invalid email"})

        try:
            user = Users.objects.get(email=email)
            if not user:
                raise ObjectDoesNotExist()
        except ObjectDoesNotExist:
            return JsonResponse({"exists": False})
        else:
            return JsonResponse({"exists": True})


@api_view(["POST"])
def login(request):
    """
        Checks user login with db

        Parameter:
            email - The user's email address
            password - The user's password
        Returns:
            User data in JSON format
    """

    if request.method == "POST":
        data = json.loads(request.body)

        if not validate_email(data["email"]):
            return JsonResponse({"error": "Invalid email"}, status=400)

        try:
            password = hashlib.sha512(data["password"].encode()).hexdigest()
            user = Users.objects.filter(email=data["email"], password=password)
            if not user:
                raise ObjectDoesNotExist()
            json_data = serializers.serialize("json", user)
            return HttpResponse(json_data, content_type="application/json")
        except ObjectDoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)


@api_view(["POST"])
def password_reset(request):
    """
        Sends a password reset email to user

        parameter - request: email to send password reset email to
        return - JSON:
            Error: Email entered is invalid
            Error: User doesn't exist in database
            True: Successfully sent email
    """

    if request.method == "POST":
        data = json.loads(request.body)
        email = data["email"]

        if not validate_email(email):
            return JsonResponse({"error": "Invalid email"})

        try:
            user = Users.objects.get(email=email)
        except Users.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)
        
        #token_generator = default_token_generator
        #token = token_generator.make_token(user)
        token = get_random_string(length=32)
        #reset_url = request.build_absolute_uri(reverse("password_reset", args=[user.pk, token]))
        reset_url = request.build_absolute_uri(reverse("password_reset"))

        response = send_password_reset(email, reset_url)

        return JsonResponse({"success": True})


@api_view(["POST"])
def signup(request):
    """
        Creates new record from data gathered on frontend

        parameter - request:
            first name
            last name
            address
            role id
            sponsor id
            email
            password
        return - JSON:
            Invalid email, 400 status
            Missing [field here], 400 status
            User with [email here] already exists, 400 status
            True: Successfully create new user
    """

    if request.method == "POST":
        # Get the form data from the JSON request body
        data = json.loads(request.body)
        password = hashlib.sha512(data["password"].encode()).hexdigest()

        email = data["email"]
        if not validate_email(email):
            return JsonResponse({"Invalid email": email}, status=400)

        # Create a new User object from the form data
        try:
            # Check if all required fields are present and not empty
            required_fields = ['first_name', 'last_name', 'email', 'password', 'role_id', 'sponsor_id']
            for field in required_fields:
                if not data.get(field):
                    return JsonResponse({"Missing or empty field": field}, status=400)

            if not Users.objects.filter(email=data["email"]).exists():
                user = Users.objects.create(
                    first_name=data["first_name"],
                    last_name=data["last_name"],
                    address=data["address"],
                    role_id=data["role_id"],
                    sponsor_id=data["sponsor_id"],
                    email=email,
                    password=password,
                )
                user.save()
            else:
                return JsonResponse({"User with this email already exists": email}, status=400)
        except ConnectionRefusedError as error:
            print(error)
            return JsonResponse({"Connection Error": error}, status=400)

        # Send a welcome email to the new user
        response = send_welcome_email(user.email, user.first_name)

        return JsonResponse({"success": True}, status=200)

