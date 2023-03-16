from django.core.mail import send_mail
from django.conf import settings

def send_test_email(email):
    """ Testing Email Send """
    subject = 'TESTING DJANGO EMAIL SEND'
    message = 'Sending email -- testing...'
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list)
