""" All Email Notification Functions """

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_password_reset(email_address, url):
    subject = "Password Reset - TruckTruckGo"
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = email_address

    context = {"url": url}

    html_content = render_to_string("reset.html", context)
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()


def send_receipt_email(email_address, order_date, order_total, items, address, name):
    subject = "Your TruckTruckGo Order"
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = email_address

    context = {
        "order_date": order_date,
        "order_total": order_total,
        "items": items,
        "address": address,
        "name": name
    }

    html_content = render_to_string("receipt.html", context)
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()


def send_welcome_email(email_address):
    subject = "Welcome to TruckTruckGo"
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = email_address

    html_content = render_to_string("welcome.html")
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()

