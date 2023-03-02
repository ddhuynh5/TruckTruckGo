from rest_framework import serializers
from .models import Driver

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = ('first_name' 'last_name', 'email', 'password', 'role_id', 'sponsor_id', 'address')