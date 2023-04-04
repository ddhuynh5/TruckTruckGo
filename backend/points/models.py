from django.db import models

class Points(models.Model):
    """ Points Model Schema """

    driver_id = models.IntegerField()
    total_points = models.IntegerField()
    
    class Meta:
        db_table = "Points"

    def __str__(self):
        return f"{self.total_points}"
