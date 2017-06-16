from django.contrib import admin
from django.contrib.admin import AdminSite

from devices.models import Device
from orders.models import Order
from repairparts.models import RepairParts


class DeviceAdmin(admin.ModelAdmin):
    list_display = ('name', 'type')
    list_filter = ('name',)





admin.site.register(Device, DeviceAdmin)
