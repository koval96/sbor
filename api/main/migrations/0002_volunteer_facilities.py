# Generated by Django 3.2.8 on 2022-04-24 04:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='volunteer',
            name='facilities',
            field=models.ManyToManyField(blank=True, related_name='volunteer_facility', to='main.Facility'),
        ),
    ]
