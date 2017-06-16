from django.contrib import admin
from repairparts.models import RepairParts


class RepairPartAdmin(admin.ModelAdmin):
    list_display = ('name', 'device', 'cost', 'quantity', 'time_to_repair')
    list_filter = ('name',)





admin.site.register(RepairParts, RepairPartAdmin)
