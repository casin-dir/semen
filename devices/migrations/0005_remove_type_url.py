# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-17 23:54
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('devices', '0004_type_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='type',
            name='url',
        ),
    ]
