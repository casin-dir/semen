from django.db import models
from django.db.models import Model
from django.db.models.signals import pre_save
from django.dispatch import receiver

from crashes.models import Crash
from devices.models import Device


class Order(Model):

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
    STATUS = (
        ('NEW','Новый'),
        ('PROGRESS','Принят'),
        ('CANCELED','Слился'),
        ('DONE','Cделан')
    )


    device = models.ForeignKey(Device, blank=True, null=True, default=None, verbose_name=u'Устройство')
    crashes = models.ManyToManyField(Crash,blank=True, verbose_name=u'Поломки')
    date = models.DateTimeField(null=True, blank=True, verbose_name=u'Дата и время заявки')
    address = models.CharField(max_length=255, default=None, blank=True, verbose_name=u'Адрес клиента')
    phone = models.CharField(max_length=255, default=None, blank=True, verbose_name=u'Телефон клиента')
    name = models.CharField(max_length=255, default=None, blank=True, verbose_name=u'Имя клиента')
    travel_time = models.IntegerField(default=0,verbose_name=u'Приблизительное время поезки(в минутах)')
    total_cost = models.IntegerField(verbose_name='Общая сумма заказа')
    status = models.CharField(max_length=100,default='NEW',choices=STATUS,verbose_name='Статус')
    handled = models.BooleanField(default=False,editable=False)

    def get_crashes(self):
        return ", ".join([str(cr) for cr in self.crashes.all()])

    get_crashes.short_description = 'Поломки'

@receiver(pre_save, sender=Order)
def add_score(instance, **kwargs):
    handled = instance.handled
    status = instance.status
    if handled is False and status == 'DONE':
        crashes = instance.crashes.all()
        for crash in crashes:
            rps = crash.rps.all()
            for rp in rps:
                rp.quantity -=1
                rp.save()
        instance.handled = True
        instance.save()
