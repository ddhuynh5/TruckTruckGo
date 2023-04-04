import os
import json

from dotenv import load_dotenv
import xml.etree.ElementTree as ET
from ebaysdk.finding import Connection as Finding
from ebaysdk.exception import ConnectionError

from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view

load_dotenv()

@api_view(["POST"])
def get_products(request):
    """
        Returns a list of items from eBay API in JSON format

        parameter - request: holds keyword/s to use with eBay API
        return - JSON: a list of items from eBay API in JSON format
    """

    if request.method == "POST":
        data = json.loads(request.body)
        
        api_config = {
            "domain": "svcs.ebay.com",
            "appid": os.environ.get("EBAY_APP_ID"),
        }

        try:
            api = Finding(**api_config, config_file=None, debug=False)
            api_request = {
                "keywords": data["keywords"],
                "itemFilter": [
                    {"name": "PictureURLSuperSize", "value": "NotNull"}
                ]
            }
            response = api.execute("findItemsAdvanced", api_request)
            
            if not response.dict():
                return JsonResponse({"message": "No items found"}, status=404)
            
            return HttpResponse(json.dumps(response.dict()), status=200, content_type="application/json")

        except ConnectionError as e:
            print(e)
            print(e.response.dict())
            return JsonResponse({"message": "Could not establish a connection to eBay API"}, status=400)
