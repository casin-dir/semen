# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-21 22:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_remove_order_travel_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='address',
            field=models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Адрес клиента'),
        ),
        migrations.AlterField(
            model_name='order',
            name='total_cost',
            field=models.IntegerField(null=True, verbose_name='Общая сумма заказа'),
        ),
    ]
