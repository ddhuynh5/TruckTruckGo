# views.py
from django.http import JsonResponse
from django.db.utils import OperationalError
from users.models import Drivers

def health_check(request):
    try:
        count = Drivers.objects.count()
        db_status = "available"
        db_message = f"{count} records found in Drivers table"
    except OperationalError:
        db_status = "unavailable"
        db_message = "Database connection failed"
    except Exception as e:
        db_status = "error"
        db_message = str(e)

    return JsonResponse({
        "status": "ok",
        "database": {
            "status": db_status,
            "message": db_message
        }
    })
