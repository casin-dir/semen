# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-16 22:21
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20170616_2210'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='idevice',
            new_name='device',
        ),
    ]