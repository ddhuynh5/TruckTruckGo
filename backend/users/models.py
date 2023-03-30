from django.db import models

class Drivers(models.Model):
    """ Driver Model Schema """
    
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    role_id = models.IntegerField()
    sponsor_id = models.IntegerField()
    address = models.CharField(max_length=255)

    class Meta:
        db_table = "Drivers"

    def __str__(self):
        return f"{self.first_name} {str(self.role_id)}"


class Users(models.Model):
    """ User Model Schema """

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    role_id = models.IntegerField()
    sponsor_id = models.IntegerField()
    address = models.CharField(max_length=255)
    unique_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = "Users"

    def __str__(self):
        return f"{self.first_name} {str(self.role_id)}"