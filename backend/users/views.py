""" Views for API Endpoints """

import os
import re
import json
import bcrypt
import secrets
import string
from datetime import datetime, timedelta
from dotenv import load_dotenv

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework.decorators import api_view
from .models import Users, Drivers, Sponsors, Admins
from points.models import Points
from cart.models import Cart
from email_notifications import send_welcome_email, send_password_reset, send_password_reset_notification, send_receipt_email
# # from decorators.login_decorator import check_session


# get environment variable from .env
load_dotenv()
DB_PASS = os.getenv("DB_PASS")

MAX_LOGIN_ATTEMPTS = 5
TOKEN_LEN = 64

class CustomTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        """
        Override the method to generate a hash value using the user's information.
        """

        return (
            str(user.pk) + str(timestamp) + str(user.last_login)
        )


def generate_token(length):
    """ Token for session id """
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for i in range(length))


def generate_unique_session_id():
    """ Generates a token, checks DB for uniqueness - returns if unique """
    while True:
        session_id = generate_token(TOKEN_LEN)
        if not Users.objects.filter(session_id=session_id).exists():
            return session_id


def validate_email(email):
    """
        Validates the email using Django"s validate_email

        parameter - email: Email to be validated
        return - bool: true if valid, false if not
    """

    regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.fullmatch(regex, email))


def set_points(driver_id, points):
    """Creates or updates points model for new drivers"""

    try:
        points_obj = Points.objects.get(driver_id=driver_id)
        points_obj.total_points = points
        if not points_obj:
            raise ObjectDoesNotExist()
    except ObjectDoesNotExist:
        points_obj = Points.objects.create(driver_id=driver_id, total_points=points)
    points_obj.save()


def verify_token_expiration_time(user):
    """ Verification of reset token creation time """

    current_time = timezone.now()
    expiration_duration = timedelta(hours=1)
    expiration_time = current_time - expiration_duration

    if user.reset_token_created_at >= expiration_time:
        return True
    else:
        return False


@api_view(["POST"])
# @check_session
def get_driver(request):
    """ Pulls Driver from Drivers Table """

    if request.method == "POST":
        data = json.loads(request.body)

        current = list(Drivers.objects.filter(
            unique_id=data["unique_id"]).values("first_name", "last_name", "email", "sponsor_id", "address"))
        json_data = json.dumps(current)

        return HttpResponse(json_data, content_type="application/json")


@api_view(["GET"])
# @check_session
def get_all_drivers(request):
    """ Pulls All Drivers for [Sponsor] from Drivers Table """

    if request.method == "GET":
        response = []
        drivers = list(Drivers.objects.values("first_name", "last_name", "unique_id"))

        for driver in drivers:
            listing = {}
            points_obj = Points.objects.get(driver_id=driver["unique_id"])

            listing["first"] = driver["first_name"]
            listing["last"] = driver["last_name"]
            listing["points"] = points_obj.total_points

            response.append(listing)

        json_data = json.dumps(response)

        return HttpResponse(json_data, content_type="application/json")


@api_view(["POST"])
def get_specific_user(request):
    """ Pulls data from user's corresponding table """

    if request.method == "POST":
        data = json.loads(request.body)
        current_role = str(data["role_id"])
        unique_id = int(data["unique_id"])

        if current_role == "Admin":
            model_class = Admins
        elif current_role == "Sponsor":
            model_class = Sponsors
        elif current_role == "Driver":
            model_class = Drivers
        else:
            raise ValueError("Invalid role ID")
        
        current_user = model_class.objects.filter(unique_id=unique_id)
        json_data = serializers.serialize("json", current_user)

        return HttpResponse(json_data, content_type="application/json")


@api_view(["POST"])
# @check_session
def get_sponsor(request):
    """ Pulls sponsor for specified user """

    if request.method == "POST":
        data = json.loads(request.body)

        current = Users.objects.filter(unique_id=data["unique_id"]).values("sponsor_id")
        current_sponsor = Sponsors.objects.filter(sponsor_id=current[0]["sponsor_id"]).values("sponsor_name", "sponsor_id")
        json_data = json.dumps(list(current_sponsor))

        return HttpResponse(json_data, content_type="application/json")

@api_view(["GET"])
def get_all_sponsors(request):
    """ Returns all sponsors """

    if request.method == "GET":
        all_sponsors = Sponsors.objects.values("sponsor_name", "sponsor_id")
        sponsor_dict = {"all_sponsors": list(all_sponsors)}
        json_data = json.dumps(sponsor_dict)

        return HttpResponse(json_data, content_type="application/json")


@api_view(["GET"])
# @check_session
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

    if request.method == "POST":
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
# @check_session
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
            if user is None:
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

            if user.role_id == 1:
                user_obj = Admins.objects.get(email=user.email)
                name = user_obj.admin_name
            elif user.role_id == 2:
                user_obj = Sponsors.objects.get(email=user.email)
                name = user_obj.sponsor_name
            else:
                user_obj = Drivers.objects.get(email=user.email)
                name = user_obj.first_name + " " + user_obj.last_name

            # Checking for login attempt timeout
            if "lockout_time" in request.COOKIES:# and request.COOKIES["lockout_time"] != "undefined":
                locked_until = datetime.fromisoformat(request.COOKIES["lockout_time"]).astimezone()
                if timezone.now() < locked_until:
                    remaining_time = locked_until - timezone.now()
                    remaining_time_str = f"{remaining_time.seconds // 60} minutes and {remaining_time.seconds % 60} seconds"
                    return JsonResponse({
                        "error": f"Maximum login attempts exceeded. You may try again in {remaining_time_str}."
                    }, status=400)
                else:
                    response = JsonResponse({
                        "error": "You may attempt to log in again."
                    }, status=400)
                    response.delete_cookie("lockout_time")
                    user.login_attempts = 0
                    user.save()
                    return response

            if not bcrypt.checkpw(password, bytes(user.password)):
                user.login_attempts += 1
                if user.login_attempts >= MAX_LOGIN_ATTEMPTS:
                    # Limit exceeded, show error message
                    lockout = timezone.now() + timezone.timedelta(minutes=5)
                    remaining_time = lockout - timezone.now()
                    remaining_time_str = f"{remaining_time.seconds // 60} minutes and {remaining_time.seconds % 60} seconds"
                    response = JsonResponse({
                        "error": f"Maximum login attempts exceeded. You may try again after {remaining_time_str}."
                    }, status=400)
                    response.set_cookie("lockout_time", lockout)
                    return response
                else:
                    user.save()
                    # Password incorrect, show error message
                    return JsonResponse({
                        "Error": "Incorrect password",
                        "Login Attempts Remaining": MAX_LOGIN_ATTEMPTS - user.login_attempts
                    }, status=400)
            else:
                # Password correct, generate new session id, set new expiration time, return user data
                session_id = generate_unique_session_id()
                user.create_session(session_id=session_id)
                json_data = serializers.serialize("json", [user])
                json_dict = json.loads(json_data)
                json_dict[0]['name'] = name
                json_data = json.dumps(json_dict)
                user.login_attempts = 0
                user.save()
                return HttpResponse(json_data, content_type="application/json")
        except ObjectDoesNotExist:
            # User does not exist, show error message
            return JsonResponse({"error": "User does not exist"}, status=400)


@api_view(['POST'])
def logout(request):
    """ 
        Logs user out

        Parameter:
            session id - user's session id from local/session storage
    """

    if request.method == "POST":
        # session_id_from_cookie = request.headers.get('sessionId')
        data = json.loads(request.body)
        session_id = data["session_id"]
        if session_id:
            user = Users.objects.filter(session_id=session_id).first()
            if user:
                # Set session expiration time to a past date to immediately invalidate the session
                user.expiration_time = timezone.now() - timezone.timedelta(days=1)
                user.session_id = None
                user.save()
                response = HttpResponse(
                    {'message': 'Logged out successfully'}, status=200)
                cookies = ['sessionId', 'expiration', 'role', 'lastName',
                           'firstName', 'uniqueId', 'email', 'remember', 'name']
                for cookie in cookies:
                    response.delete_cookie(cookie)
                return response
        return HttpResponse({'error': 'Invalid session id'}, status=401)


@api_view(["POST"])
def generate_password_reset(request):
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
            return JsonResponse({"error": "Invalid email"}, status=400)

        try:
            user = Users.objects.get(email=email)
            if user is None:
                raise ObjectDoesNotExist()
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Email not found"}, status=400)

        token_generator = CustomTokenGenerator()
        token = token_generator.make_token(user)
        reset_url = f"{settings.BASE_URL}/reset-password?token={token}"

        user.reset_token = token
        user.reset_token_created_at = timezone.now()
        user.save()

        send_password_reset(email, reset_url)

        return JsonResponse({"success": True})


@api_view(["POST"])
def validate_password_reset(request):
    """
        Validates user's password reset request

        parameter - request:
            password reset token
        return - JSON:
            Invalid user, 400 status
            Invalid token, 400 status
            Token expired, 400 status
            True: token and user id valid
    """

    if request.method == "POST":
        data = json.loads(request.body)
        url_token = data["token"]

        try:
            user = Users.objects.get(reset_token=url_token)
            if user is None:
                raise ObjectDoesNotExist()
        except ObjectDoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)

        if verify_token_expiration_time(user):
            if url_token == user.reset_token:
                return JsonResponse({"success": True})
            else:
                return JsonResponse({"error": "Invalid Token"}, status=400)
        else:
            return JsonResponse({"error": "Token expired"}, status=400)


@api_view(["POST"])
def password_reset(request):
    """
        Replace old password in DB with new user generated password

        parameter - request:
            password reset token
            password
        return JSON:
            Invalid user, 400 status
            Cannot use old password, 400 status
            True: successfully stored new password
    """

    if request.method == "POST":
        data = json.loads(request.body)
        token = data["token"]
        password = data["password"].encode("utf-8")

        try:
            user = Users.objects.get(reset_token=token)
        except Users.DoesNotExist:
            return JsonResponse({"error": "Invalid Token"}, status=400)
        
        if bcrypt.checkpw(password, bytes(user.password)):
            return JsonResponse({"error": "New password cannot be the old password"}, status=400)
        else:
            hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
            user.password = hashed_password
            user.reset_token = None
            user.reset_token_created_at = None
            user.save()
            send_password_reset_notification(user.email)
            return JsonResponse({"success": True})


@api_view(["POST"])
def signup(request):
    """
        Creates new record from data gathered on frontend

        parameter - request:
            address [optional]
            first name [optional]
            last name [optional]
            sponsor name [optional]
            admin name [optional]
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
            return JsonResponse({"Error": "Invalid email"}, status=400)

        # Create a new User object from the form data
        try:
            # Check if all required fields are present and not empty
            required_fields = ["email", "password", "role_id", "sponsor_id"]
            
            if data["role_id"] and data["role_id"] == 1: # if admin ignore sponsor id
                required_fields.remove("sponsor_id")

            for field in required_fields:
                if not data.get(field):
                    return JsonResponse({"Error": f"Missing or empty [{field}]"}, status=400)

            if not Users.objects.filter(email=email).exists():
                user = Users.objects.create(
                    role_id=data["role_id"],
                    sponsor_id=data["sponsor_id"],
                    email=email,
                    password=password,
                )
                session_id = generate_unique_session_id()
                user.create_session(session_id=session_id)
                user.save()
                new_id = user.unique_id
                try:
                    driver = Drivers.objects.create(
                        unique_id=new_id,
                        first_name=data["first_name"],
                        last_name=data["last_name"],
                        email=data["email"],
                        address=data["address"],
                        password=password,
                        role_id=data["role_id"],
                        sponsor_id=data["sponsor_id"],
                    )
                    driver.save()
                    set_points(new_id, 500)
                except Exception as e:
                    print(e)
                    return JsonResponse({"Error: ": str("yes")}, status=400)
            else:
                return JsonResponse({"Error": f"User [{email}] already exists"}, status=400)
        except ConnectionRefusedError as error:
            print(error)
            return JsonResponse({"Error": error}, status=400)

        # Send a welcome email to the new user
        response = send_welcome_email(user.email)
        new_user = Users.objects.filter(email=email)
        json_data = serializers.serialize("json", new_user)

        json_dict = json.loads(json_data)
        json_dict[0]["name"] = driver.first_name + " " + driver.last_name
        json_data = json.dumps(json_dict)

        return HttpResponse(json_data, content_type="application/json", status=response)


@api_view(["POST"])
# @check_session
def update(request):
    """
        Updates user in database

        Parameter:
            unique_id - User's unique id, used to locate in db
            [parameter to update here]
        Returns:
            Success msg if record updated
            Error - connection, invalid email, can't find user in db
    """

    if request.method == "POST":
        data = json.loads(request.body)

        try:
            user = Users.objects.filter(unique_id=data["unique_id"]).first()
            if user:
                try:
                    user_info = {}
                    driver = Drivers.objects.get(unique_id=data["unique_id"])
                    
                    fields_mapping = {
                        "first_name": "first_name",
                        "last_name": "last_name",
                        "email": "email",
                        "address": "address",
                        "sponsor_id": "sponsor_id",
                        "password": "password"
                    }

                    for field, key in fields_mapping.items():
                        if data[key] and data[key] != getattr(driver, field):
                            if field == "password":
                                if not bcrypt.checkpw(data["password"].encode("utf-8"), bytes(user.password)):
                                    user_info[field] = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())
                            else:
                                user_info[field] = data[key]

                    driver.__dict__.update(**user_info)
                    driver.save()
                    user.__dict__.update(**user_info)
                    user.save()

                except Exception as e:
                    print(e)
                    return JsonResponse({"Error: ": str(e)}, status=400)
            else:
                return JsonResponse({"Could not find user": data["unique_id"]}, status=400)
        except ConnectionRefusedError as error:
            print(error)
            return JsonResponse({"Connection Error": error}, status=400)

        return JsonResponse({"success": True}, status=200)


@api_view(["POST"])
def deactivate(request):
    """
        Removes user info from db

        Parameter:
            unique_id - User's unique id, used to locate in db
        Returns:
            Success msg if deletion complete
            Error - connection, can't find user in db
    """

    if request.method == "POST":
        data = json.loads(request.body)

        try:
            user = Users.objects.get(unique_id=data["unique_id"])

            if user:
                try:
                    cart = Cart.objects.filter(UserID=data["unique_id"]).all()
                    points = Points.objects.get(driver_id=data["unique_id"])
                    driver = Drivers.objects.get(unique_id=data["unique_id"])

                    cart.delete()
                    points.delete()
                    driver.delete()
                    user.delete()

                except Exception as e:
                    print(e)
                    return JsonResponse({"Error: ": str(e)}, status=400)
            else:
                return JsonResponse({"Error deleting account, please contact support": data["unique_id"]}, status=400)

        except ConnectionRefusedError as error:
            print(error)
            return JsonResponse({"Connection Error": error}, status=400)

    return JsonResponse({"success": True}, status=200)
