# Generated by Django 4.2.7 on 2024-01-21 08:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='id_user',
        ),
    ]
