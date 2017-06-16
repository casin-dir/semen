from django.db import models
from django.db.models import Model
from devices.models import Device


class RepairParts(Model):

    class Meta:
        verbose_name = 'Деталь'
        verbose_name_plural = 'Детали'

    name = models.CharField(max_length=255, default=None, blank=True, verbose_name='Название детали')
    device = models.ForeignKey(Device, blank=True, null=True, default=None, verbose_name='Устройство')
    cost = models.IntegerField(verbose_name='Стоимость детали')
    quantity = models.IntegerField(default=0,verbose_name='Кол-во деталей')
    time_to_repair = models.IntegerField(default=0,verbose_name='Время ремонта(в минутах)')


    def __str__(self):
        return '%s' % (self.name)


