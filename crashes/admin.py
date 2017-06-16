from django.contrib import admin

from crashes.models import Crash


class CrashAdmin(admin.ModelAdmin):
    list_display = ('name', 'device', 'rps', 'percent_cost', 'abs_cost')
    list_filter = ('name',)

    def rps(self,obj):
        return 'ХУЙ'






admin.site.register(Crash, CrashAdmin)
