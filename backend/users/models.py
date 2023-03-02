from django.db import models

class Driver(models.Model):
    """ Driver Model Schema """
    
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=150)
    password = models.CharField(max_length=350)
    role_id = models.IntegerField()
    sponsor_id = models.IntegerField()
    address = models.CharField(max_length=350)

    def __str__(self):
        return self.first_name + "  " + self.role_id