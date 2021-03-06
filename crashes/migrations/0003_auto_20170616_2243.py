# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-16 22:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crashes', '0002_auto_20170616_2210'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='crash',
            options={'verbose_name': 'Поломка', 'verbose_name_plural': 'Поломки'},
        ),
        migrations.RemoveField(
            model_name='crash',
            name='address',
        ),
        migrations.RemoveField(
            model_name='crash',
            name='phone',
        ),
        migrations.RemoveField(
            model_name='crash',
            name='total_cost',
        ),
        migrations.RemoveField(
            model_name='crash',
            name='travel_time',
        ),
        migrations.AddField(
            model_name='crash',
            name='abs_cost',
            field=models.IntegerField(default=0, verbose_name='Стоимость работы'),
        ),
        migrations.AddField(
            model_name='crash',
            name='percent_cost',
            field=models.IntegerField(default=0, verbose_name='Процент работы'),
        ),
    ]
