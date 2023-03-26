""" All Email Notification Functions """

import os
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, HtmlContent

def send_welcome_email(email, first_name):
    """ Sends the user a welcome email 
    
    :param email: Email to be sent to
    :param first_name: First name of user
    :returns API Response Code
    :raises Exception """
    
    message = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails=email,
        subject="Welcome to Scrummy Bears Driving!",
        html_content=f"""
            <!DOCTYPE html>
            <html>
            <body>
                <p>Dear { first_name },</p>
                <p>Thank you for registering with Scrummy Bears Driving. We're excited to have you as a member of our community!</p>
                <p>As a registered user, you can now:</p>
                <ul>
                <li>Create and manage your own profile</li>
                <li>Purchase products through our point-based reward system</li>
                <li>Connect with other members of the community</li>
                </ul>
                <p>If you have any questions or issues with your account, please don't hesitate to contact us.</p>
                <p>Best regards,</p>
                <p>The Scrummy Bears Driving team</p>
            </body>
            </html>
        """
    )

    try:
        send_grid_client = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))
        response = send_grid_client.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        print("Message Sent!")
    except Exception as e:
        print("Error: {0}".format(e))

    return str(response.status_code)


def send_password_reset(email, url):
    """ Sends the user a password reset email 
    
    :param email: Email to be sent to
    :param url: Reset URL
    :returns API Response Code
    :raises Exception """
    
    message = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails=email,
        subject="Reset your password",
        html_content=f"""
            <!DOCTYPE html>
            <html>
            <body>
                <p>You've requested to reset your Scrummy Bears Driving password for { email }.</p>
                <p>If you didn't request this, you can ignore this email.</p>
                <table cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center" bgcolor="#22c96f" style="border-radius: 25px;">
                    <a href="{url}" target="_blank" style="padding: 12px 25px; color: #ffffff; font-size: 18px; font-weight: bold; text-decoration: none; display: inline-block; border-radius: 25px;">Reset Password</a>
                    </td>
                </tr>
                </table>
                <p>Best regards,</p>
                <p>The Scrummy Bears Driving team</p>
            </body>
            </html>
        """
    )

    try:
        send_grid_client = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))
        response = send_grid_client.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        print("Message Sent!")
    except Exception as e:
        print("Error: {0}".format(e))

    return str(response.status_code)
