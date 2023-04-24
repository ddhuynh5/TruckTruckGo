from django.db import models

class Points(models.Model):
    """ Points Model Schema """

    driver_id = models.IntegerField(primary_key=True)
    total_points = models.FloatField()
    
    class Meta:
        db_table = "Points"
        managed = False

    def __str__(self):
        return f"{self.total_points}"
