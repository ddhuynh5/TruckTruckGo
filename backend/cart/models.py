from django.db import models


class Cart(models.Model):
    """ Cart Model Schema """
    ID = models.AutoField(primary_key=True)
    UserID = models.IntegerField()
    ItemName= models.CharField(max_length=1000)
    Price = models.DecimalField(max_digits=7, decimal_places=2)
    Quantity = models.IntegerField()
    ItemID = models.BigIntegerField()
    ImageURL = models.CharField(max_length=255)
    
    class Meta:
        db_table = "Cart"
        managed = True

    def __str__(self):
        return f"{self.UserID}"