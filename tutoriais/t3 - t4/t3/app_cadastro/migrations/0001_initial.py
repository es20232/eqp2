# Generated by Django 4.2.7 on 2023-11-20 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Login',
            fields=[
                ('id_login', models.AutoField(primary_key=True, serialize=False)),
                ('usuario', models.TextField(max_length=255)),
                ('senha', models.TextField(max_length=255)),
            ],
        ),
    ]
