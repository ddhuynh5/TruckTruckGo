from django.db import models
from django.utils import timezone


class Drivers(models.Model):
    """ Driver Model Schema """
    
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.BinaryField(max_length=255)
    role_id = models.IntegerField()
    sponsor_id = models.IntegerField()
    address = models.CharField(max_length=255)
    unique_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = "Drivers"
        managed = True

    def __str__(self):
        return f"{str(self.first_name)} {str(self.role_id)}"


class Sponsors(models.Model):
    """ Sponsor Model Schema """
    
    sponsor_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.BinaryField(max_length=255)
    sponsor_id = models.IntegerField()
    role_id = models.IntegerField()
    address = models.CharField(max_length=255)
    unique_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = "Sponsors"
        managed = True

    def __str__(self):
        return f"{str(self.sponsor_name)} {str(self.role_id)}"


class Admins(models.Model):
    """ Admin Model Schema """
    
    admin_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.BinaryField(max_length=255)
    role_id = models.IntegerField()
    unique_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = "Admins"
        managed = True

    def __str__(self):
        return f"{str(self.admin_name)} {str(self.role_id)}"


class Users(models.Model):
    """ User Model Schema """

    email = models.CharField(max_length=255)
    password = models.BinaryField(max_length=255)
    role_id = models.IntegerField()
    sponsor_id = models.IntegerField()
    login_attempts = models.IntegerField(default=0)
    unique_id = models.AutoField(primary_key=True)
    session_id = models.CharField(max_length=255, null=True)
    expiration_time = models.DateTimeField(default=None, null=True)
    reset_token = models.CharField(max_length=255, null=True)
    reset_token_created_at = models.DateTimeField(null=True)

    class Meta:
        db_table = "Users"
        managed = True

    def __str__(self):
        return f"{str(self.email)} {str(self.role_id)}"
    
    def create_session(self, session_id):
        expiration_time_utc = timezone.now() + timezone.timedelta(hours=1)
        est_tz = timezone.get_fixed_timezone(-300)  # -5 hours from UTC
        expiration_time = expiration_time_utc.astimezone(est_tz)
        self.session_id = session_id
        self.expiration_time = expiration_time
        self.save()