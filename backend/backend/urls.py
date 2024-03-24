"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from users import views as users_views
from catalog import views as catalog_views
from points import views as points_views
from cart import views as cart_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("current_driver", users_views.get_driver),
    path("drivers", users_views.get_all_drivers),
    path("sponsors", users_views.get_sponsor),
    path("all_sponsors", users_views.get_all_sponsors),
    path("signup", users_views.signup),
    path("login", users_views.login),
    path("logout", users_views.logout),
    path("password_reset", users_views.password_reset),
    path("validate_password_reset", users_views.validate_password_reset),
    path("generate_password_reset", users_views.generate_password_reset),
    path("update", users_views.update),
    path("specific", users_views.get_specific_user),
    path("catalog", catalog_views.get_products),
    path("points", points_views.get_points),
    path("cartAdd", cart_views.add_to_cart),
    path("cartRemove", cart_views.remove_from_cart),
    path("cart", cart_views.get_cart_items),
    path("order", cart_views.place_order),
    path("updateItem", cart_views.update_item),
    path("deactivate", users_views.deactivate)
]
