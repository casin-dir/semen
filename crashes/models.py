from django.db import models
from django.db.models import Model

from devices.models import Device
from repairparts.models import RepairParts


class Crash(Model):

    class Meta:
        verbose_name = 'Поломка'
        verbose_name_plural = 'Поломки'

    name = models.CharField(max_length=255, default=None, blank=True, verbose_name=u'Название поломки')
    device = models.ForeignKey(Device, blank=True, null=True, default=None, verbose_name=u'Устройство')
    rps = models.ManyToManyField(RepairParts,blank=True, verbose_name=u'Поломки')
    percent_cost = models.IntegerField(default=0,verbose_name='Процент работы')
    abs_cost = models.IntegerField(default=0,verbose_name='Стоимость работы')
    url = models.CharField(max_length=255, default=None, blank=True, verbose_name=u'Картинка')

    def __str__(self):
        return '%s' % (self.name)