from django.db import models
from django.db.models import Model


class Device(Model):
    class Meta:
        verbose_name = 'Устройство'
        verbose_name_plural = 'Устройства'

    name = models.CharField(max_length=255, default=None, blank=True, verbose_name=u'Модель устройства')
    type = models.CharField(max_length=255, default=None, blank=True, verbose_name=u'Тип устройства')

    def __str__(self):
        return '%s' % (self.name)
