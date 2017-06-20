from django.contrib import admin

from orders.models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','device', 'get_crashes', 'date', 'address', 'phone', 'name', 'travel_time','total_cost','status')
    list_filter = ('date',)




admin.site.register(Order, OrderAdmin)
