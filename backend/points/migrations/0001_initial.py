# Generated by Django 4.1.5 on 2023-04-05 19:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Points',
            fields=[
                ('driver_id', models.AutoField(primary_key=True, serialize=False)),
                ('total_points', models.IntegerField()),
            ],
            options={
                'db_table': 'Points',
                'managed': False,
            },
        ),
    ]
