from django.contrib import admin

from crashes.models import Crash


class CrashAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'device', 'get_rps', 'abs_cost')
    list_filter = ('name',)


admin.site.register(Crash, CrashAdmin)
