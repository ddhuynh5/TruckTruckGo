# Generated by Django 4.1.5 on 2023-03-16 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='driver',
            name='address',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='driver',
            name='email',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='driver',
            name='first_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='driver',
            name='last_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterModelTable(
            name='driver',
            table='Drivers',
        ),
    ]