# Generated by Django 5.0.3 on 2024-03-24 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_users_reset_token_users_reset_token_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='last_login',
            field=models.DateTimeField(null=True),
        ),
    ]
