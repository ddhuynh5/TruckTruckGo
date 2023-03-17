""" All Email Notification Functions """

import os
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_welcome_email(email):
    """ Sends the user a welcome email """
    
    message = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails=email,
        subject="Welcome to Scrummy Bears Driving!",
        html_content="<strong>Thank you for signing up!</strong>"
    )

    try:
        send_grid_client = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))
        response = send_grid_client.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)
