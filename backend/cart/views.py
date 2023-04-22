from django.shortcuts import render
from django.http import JsonResponse
from cart.models import Cart
from rest_framework.decorators import api_view
from decorators.login_decorator import check_session
import json

from datetime import datetime
from dotenv import load_dotenv

from django.http import JsonResponse

@api_view(["GET"])
@check_session
def get_cart_items(request):
    user_id = request.GET.get('user_id')
    if not user_id:
        return JsonResponse({'error': 'user_id parameter is missing'})

    try:
        cart_items = Cart.objects.filter(UserID=user_id)
        cart_data = []
        for item in cart_items:
            cart_data.append({
                'ItemID': item.ItemID,
                'ItemName': item.ItemName,
                'Price': item.Price,
                'Quantity': item.Quantity,
                'UserID': item.UserID,
            })
        return JsonResponse({'cartItems': cart_data})
    except Exception as e:
        return JsonResponse({'error': str(e)})
  

@api_view(["POST"])
#@check_session
def remove_from_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Get the data from the request
        UserID = data["properties"]["UserID"]
        ItemID = data["properties"]["ItemID"]
        
        # Validate the incoming data
        if not UserID or not ItemID:
            return JsonResponse({'error': 'Missing parameters'}, status=400)
        
        if not UserID:
            return JsonResponse({'error': 'Missing parameters'}, status=400)

        # Remove the item from the cart table
        try:
            #cart_item = Cart.objects.get(UserID=UserID, ItemID=ItemID)
            cart_item = Cart.objects.filter(UserID=UserID, ItemID=ItemID)
            cart_item.delete()
            return JsonResponse({'success': True})
        except Cart.DoesNotExist:
            return JsonResponse({'error': 'Item not found in cart'}, status=404)
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=500)

    # Return an error for non-POST requests
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@api_view(["POST"])
#@check_session
def add_to_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Get the data from the request
        UserID = data["properties"]["UserID"]
        ItemID = data["properties"]["ItemID"]
        Quantity = data["properties"]["Quantity"]
        ItemName= data["properties"]["ItemName"]
        Price= data["properties"]["Price"]
        print(UserID)
        print(ItemID)
        print(Quantity)
        print(Price)

        # Validate the incoming data
        if not UserID or not ItemID or not Quantity:
            return JsonResponse({'error': 'Missing parameters'}, status=400)

        
        # Save the data to the cart table
        try:
            cart = Cart.objects.create(UserID=UserID, ItemID=ItemID, Quantity=Quantity, ItemName=ItemName, Price=Price)
            return JsonResponse({'success': True})
        except Exception as e:
            print("HERE", e)
            return JsonResponse({'error': str(e)}, status=500)

    # Return an error for non-POST requests
    return JsonResponse({'error': 'Invalid request method'}, status=405)

