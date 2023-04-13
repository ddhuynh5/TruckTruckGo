from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from users.models import Users


def check_session(func):
    """
        Wrapper decorator authorization, check if user's session is valid before running any backend commands
        Use by adding '@check_session' as a decorator
    """
    def wrapper(request, *args, **kwargs):
        session_id_from_cookie = request.COOKIES.get('sessionId')
        if session_id_from_cookie:
            user = Users.objects.filter(session_id=session_id_from_cookie).first()
            if user:
                if user.expiration_time > timezone.now():
                    # session is valid, proceed with the view function
                    return func(request, *args, **kwargs)
                else:
                    # session has expired, return an error response
                    return Response({'error': 'Session has expired, please log in'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                # invalid session_id_from_cookie, return an error response
                return Response({'error': 'Invalid session, please log in'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # session_id_from_cookie not found in cookies, return an error response
            return Response({'error': 'Session not found, please log in'}, status=status.HTTP_401_UNAUTHORIZED)
    return wrapper
