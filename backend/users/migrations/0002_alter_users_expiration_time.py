# Generated by Django 5.0.3 on 2024-03-08 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='expiration_time',
            field=models.DateTimeField(default=None, null=True),
        ),
    ]