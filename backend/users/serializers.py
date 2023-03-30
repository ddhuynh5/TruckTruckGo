from rest_framework import serializers
from .models import Driver

class DriverSerializer(serializers.ModelSerializer):
    """ Not currently in-use since we don't need a custom serializer ATM """
    class Meta:
        model = Driver
        fields = ('first_name' 'last_name', 'email', 'password', 'role_id', 'sponsor_id', 'address')
