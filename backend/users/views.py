""" Views for API Endpoints """

import os
import json
import bcrypt
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
from .models import Users, Drivers, Sponsors, Admins
from points.models import Points
from .email_notifications import send_welcome_email, send_password_reset

# get environment variable from .env
load_dotenv()
DB_PASS = os.getenv("DB_PASS")


def validate_email(email):
    """
        Validates the email using Django"s EmailValidator

        parameter - email: Email to be validated
        return - bool: true if valid, false if not
    """

    validator = EmailValidator()
    try:
        validator(email)
    except ValidationError:
        return False
    return True


def set_points(driver_id, points=0):
    """Creates or updates points model for new drivers"""

    try:
        points_obj = Points.objects.get(driver_id=driver_id)
        points_obj.total_points = points
        if not points_obj:
            raise ObjectDoesNotExist()
    except ObjectDoesNotExist:
        points_obj = Points.objects.create(driver_id=driver_id, total_points=points)
    points_obj.save()


def create_update_role(data, password, new_id, user=None):
    """
        Creates model based on role_id
        If user exists, updates user instead
    """

    roles = {
        1: Admins,
        2: Sponsors,
        3: Drivers
    }

    current_role = data["role_id"] if "role_id" in data else user.role_id

    if current_role == 1:
        model_class = Admins
        related_model_class = Users
    elif current_role == 2:
        model_class = Sponsors
        related_model_class = Users
    elif current_role == 3:
        model_class = Drivers
        related_model_class = Users
    else:
        raise ValueError("Invalid role ID")

    defaults = {
        "first_name": data["first_name"] if "first_name" in data else user.first_name,
        "last_name": data["last_name"] if "last_name" in data else user.last_name,
        "password": password if password else user.password,
        "role_id": current_role,
        "sponsor_id": data["sponsor_id"] if "sponsor_id" in data else user.sponsor_id,
        "address": data["address"] if "address" in data else user.address,
        "unique_id": new_id,
    }

    if model_class == Admins:
        del defaults["sponsor_id"]

    obj, created = model_class.objects.get_or_create(
        email=data["email"] if "email" in data else user.email, defaults=defaults
    )

    # Updating current record if exists
    if not created:
        obj.first_name = defaults["first_name"]
        obj.last_name = defaults["last_name"]
        obj.password = password
        obj.role_id = defaults["role_id"]
        obj.address = defaults["address"]
        obj.save()

    if obj.role_id == 3:
        set_points(new_id, data["total_points"] if "total_points" in data else 0)

    # Updating tables where previous role_id existed
    non_new_roles = [role for role in roles.values() if role != roles[current_role]]
    for role in non_new_roles:
        if role == Drivers:
            Points.objects.filter(driver_id=new_id).delete()
        role.objects.filter(email=data["email"]).delete()
    
    # Updating Users Table
    if related_model_class:
        related_obj = related_model_class.objects.get(email=data["email"])
        related_obj.first_name = defaults["first_name"]
        related_obj.last_name = defaults["last_name"]
        related_obj.password = password
        related_obj.role_id = defaults["role_id"]
        related_obj.address = defaults["address"]
        related_obj.save()


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

        parameter - request: holds user"s email and password
        return - JSON:
            True: password match
            False: no match
            Error: User doesn"t exist in the table
    """

    if request.method == "GET":
        try:
            email = request.GET.get("email")
            password = request.GET.get("password")

            if not validate_email(email):
                return JsonResponse({"error": "Invalid email"})

            current_pass = password.encode("utf-8")
            prev_pass = Users.objects.filter(email=email).values("password")
            
            if bcrypt.checkpw(current_pass, prev_pass):
                return JsonResponse({"matches": True})
            else:
                return JsonResponse({"matches": False})
        except Users.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)


@api_view(["GET"])
def login_exists(request):
    """
        Checks if the login exists in database

        parameter - request: holds user"s email
        return - JSON:
            True: User exists
            False: User doesn"t exist
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
            password = data["password"].encode("utf-8")
            user = Users.objects.get(email=data["email"])
            if not bcrypt.checkpw(password, user.password):
                user.login_attempts += 1
                if user.login_attempts >= 3:
                    # Limit exceeded, show error message
                    return JsonResponse({"error": "Maximum login attempts exceeded"}, status=400)
                else:
                    user.save()
                    # Password incorrect, show error message
                    return JsonResponse({
                        "Error": "Incorrect password",
                        "Login Attempts Remaining": 3 - user.login_attempts
                    }, status=400)
            else:
                # Password correct, return user data
                json_data = serializers.serialize("json", [user])
                user.login_attempts = 0
                user.save()
                return HttpResponse(json_data, content_type="application/json")
        except ObjectDoesNotExist:
            # User does not exist, show error message
            return JsonResponse({"error": "User does not exist"}, status=400)


@api_view(["POST"])
def password_reset(request):
    """
        Sends a password reset email to user

        parameter - request: email to send password reset email to
        return - JSON:
            Error: Email entered is invalid
            Error: User doesn"t exist in database
            True: Successfully sent email
    """

    if request.method == "POST":
        data = json.loads(request.body)
        email = data["email"]

        if not validate_email(email):
            return JsonResponse({"error": "Invalid email"})

        try:
            user = Users.objects.get(email=email)
            if not user:
                raise ObjectDoesNotExist()
        except ObjectDoesNotExist:
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
        password = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())

        email = data["email"]
        if not validate_email(email):
            return JsonResponse({"Invalid email": email}, status=400)

        # Create a new User object from the form data
        try:
            # Check if all required fields are present and not empty
            required_fields = ["first_name", "last_name", "email", "password", "role_id", "sponsor_id"]
            for field in required_fields:
                if not data.get(field):
                    return JsonResponse({"Missing or empty field": field}, status=400)

            if not Users.objects.filter(email=email).exists():
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
                new_id = user.unique_id
                try:
                    create_update_role(data, password, new_id)
                except Exception as e:
                    print(e)
                    return JsonResponse({"Error: ": str(e)}, status=400)
            else:
                return JsonResponse({"User with this email already exists": email}, status=400)
        except ConnectionRefusedError as error:
            print(error)
            return JsonResponse({"Connection Error": error}, status=400)

        # Send a welcome email to the new user
        response = send_welcome_email(user.email, user.first_name)
        new_user = Users.objects.filter(email=email)
        json_data = serializers.serialize("json", new_user)

        return HttpResponse(json_data, content_type="application/json", status=response)


@api_view(["POST"])
def update(request):
    """
        Updates user in database

        Parameter:
            email - User"s email, used to locate in db
            [parameter to update here]
        Returns:
            Success msg if record updated
            Error - connection, invalid email, can't find user in db
    """

    if request.method == "POST":
        data = json.loads(request.body)

        email = data["email"]
        if not validate_email(email):
            return JsonResponse({"Invalid email": email}, status=400)
        
        try:
            user = Users.objects.filter(email=email).first()
            if user:
                try:
                    create_update_role(data, user.password, user.unique_id, user)
                except Exception as e:
                    print(e)
                    return JsonResponse({"Error: ": str(e)}, status=400)
            else:
                return JsonResponse({"Could not find user with email: ": email}, status=400)
        except ConnectionRefusedError as error:
            print(error)
            return JsonResponse({"Connection Error": error}, status=400)

        return JsonResponse({"success": True}, status=200)
