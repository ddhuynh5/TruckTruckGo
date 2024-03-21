""" All Email Notification Functions """

import os
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


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
        send_grid_client = SendGridAPIClient(SG_KEY)
        response = send_grid_client.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        print("Message Sent!")
    except Exception as e:
        print("Error: {0}".format(e))

    return str(response.status_code)


def send_receipt_email(to_email, order_date, order_total, items):
    message = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails=to_email,
        subject='Your Scrummy Bears Driving Order',
        html_content=f'''
        <p>Dear valued customer,</p>
        <p>Thank you for your order! Here is your receipt:</p>
        <table>
            <tr>
                <td><strong>Order Date:</strong></td>
                <td>{order_date}</td>
            </tr>
            <tr>
                <td><strong>Order Total:</strong></td>
                <td>${order_total:.2f}</td>
            </tr>
        </table>
        <p>Here are the items you purchased:</p>
        <ul>
            {''.join([f"<li><img src='{item['ImageURL']}' alt='{item['ItemName']}' width='50' height='50' />{item['ItemName']} (${item['Price']:.2f}) x {item['Quantity']}</li>" for item in items])}
        </ul>
        <p>Thank you for shopping with us!</p>
        '''
    )
    try:
        sg = SendGridAPIClient(SG_KEY)
        response = sg.send(message)
        print(f'Receipt email sent to {to_email}. Status code: {response.status_code}')
    except Exception as e:
        print(str(e))


def send_welcome_email(email_address):
    subject = "Welcome to TruckTruckGo"
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = email_address

    context = {
        "email": email_address
    }

    html_content = render_to_string("welcome.html", {"context": "values"})
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()

