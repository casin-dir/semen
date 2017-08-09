from django.contrib import admin
from django.contrib.admin import AdminSite

from devices.models import Device, Type
from orders.models import Order
from repairparts.models import RepairParts


class DeviceAdmin(admin.ModelAdmin):
    list_display = ('name', 'type')
    list_filter = ('name',)


class TypeAdmin(admin.ModelAdmin):
    list_display = ('type','active')
    list_filter = ('type',)


admin.site.register(Type, TypeAdmin)
admin.site.register(Device, DeviceAdmin)
