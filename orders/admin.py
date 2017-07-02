from django.contrib import admin

from orders.models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'device', 'get_crashes', 'date', 'show_address_url', 'phone', 'name', 'total_cost', 'status')
    list_filter = ('date',)

    def show_address_url(self, obj):
        return '<a href="%s">%s</a>' % (obj.address, obj.address)

    show_address_url.allow_tags = True
    show_address_url.short_description = 'Как добраться'


admin.site.register(Order, OrderAdmin)
