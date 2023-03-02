# Generated by Django 4.1.5 on 2023-03-02 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Driver",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first_name", models.CharField(max_length=200)),
                ("last_name", models.CharField(max_length=200)),
                ("email", models.CharField(max_length=150)),
                ("password", models.CharField(max_length=350)),
                ("role_id", models.IntegerField()),
                ("sponsor_id", models.IntegerField()),
                ("address", models.CharField(max_length=350)),
            ],
        ),
    ]
