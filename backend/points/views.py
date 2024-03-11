import json
from .models import Points
from django.http import HttpResponse
from rest_framework.decorators import api_view
from decorators.login_decorator import check_session

@api_view(["POST"])
# @check_session
def get_points(request):
    """
        Returns points for driver

        parameter: 
            Driver's ID
            Example: 
                { 
                    "id": [Driver's Id Here]
                }
        return:
            Driver's points
    """

    if request.method == "POST":
        data = json.loads(request.body)
        queryset = Points.objects.filter(driver_id=data["id"]).values("total_points")
        json_data = json.dumps(list(queryset))

        return HttpResponse(json_data, content_type="application/json")
