import json
from datetime import date
from cart.models import Cart
from django.http import JsonResponse
from rest_framework.decorators import api_view
from decorators.login_decorator import check_session
from email_notifications import send_receipt_email
from points.models import Points

@api_view(["POST"])
@check_session
def get_cart_items(request):
    if request.method == "POST":
        user_id = json.loads(request.body)["user_id"]
        if not user_id:
            return JsonResponse({'error': 'user_id parameter is missing'})
        try:
            cart_items = Cart.objects.filter(UserID=user_id)
            cart_data = [{'ItemID': item.ItemID, 'ItemName': item.ItemName, 'Price': float(item.Price), 'Quantity': item.Quantity, 'UserID': item.UserID, 'ImageURL': item.ImageURL} for item in cart_items]
            serialized_data = json.dumps({'cartItems': cart_data})
            return JsonResponse(json.loads(serialized_data), status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)})


@api_view(["POST"])
@check_session
def remove_from_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Get the data from the request
        UserID = data["UserID"]
        ItemID = data["ItemID"]
        
        # Validate the incoming data
        if not UserID or not ItemID:
            return JsonResponse({'error': 'Missing parameters'}, status=400)
        
        # Remove the item from the cart table
        try:
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
@check_session
def add_to_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Get the data from the request
        UserID = data["properties"]["UserID"]
        ItemID = data["properties"]["ItemID"]
        Quantity = data["properties"]["Quantity"]
        ItemName = data["properties"]["ItemName"]
        Price = data["properties"]["Price"]
        ImgURL = data["properties"]["img"]

        # Validate the incoming data
        if not UserID or not ItemID or not Quantity:
            return JsonResponse({'error': 'Missing parameters'}, status=400)
        
        # Save the data to the cart table
        try:
            carts = Cart.objects.filter(UserID=UserID, ItemID=ItemID)
            if carts:
                cart = carts.first()
                cart.Quantity += int(Quantity)
                cart.save()
            else:
                Cart.objects.create(UserID=UserID, ItemID=ItemID, Quantity=Quantity, ItemName=ItemName, Price=Price, ImageURL=ImgURL)
            return JsonResponse({'success': True})
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=500)

    # Return an error for non-POST requests
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@api_view(["POST"])
@check_session
def place_order(request):

    if request.method == 'POST':
        data = json.loads(request.body)

        user_id = data["id"]
        email = data["email"]
        total = data["total"]
        items = data["items"]

        # Validate the incoming data
        if not user_id:
            return JsonResponse({'error': 'Missing UserID parameter'}, status=400)
        
        # Remove all items from the cart table for the given user_id
        try:
            cart_items = Cart.objects.filter(UserID=user_id)
            cart_items.delete()
            send_receipt_email(to_email=email, order_date=date.today(), order_total=total, items=items)
            points_obj = Points.objects.get(driver_id=user_id)
            points_obj.total_points = points_obj.total_points - total
            points_obj.save()
            return JsonResponse({'success': True})
        except Cart.DoesNotExist:
            return JsonResponse({'error': 'No items found in cart for the given UserID'}, status=404)
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=500)
