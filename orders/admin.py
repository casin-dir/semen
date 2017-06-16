from django.contrib import admin

from orders.models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ('device', 'crashes_str', 'date', 'address', 'phone', 'name', 'travel_time','total_cost','status')
    list_filter = ('date',)

    def crashes_str(self, obj):
        return 'ХУЙ'



admin.site.register(Order, OrderAdmin)
