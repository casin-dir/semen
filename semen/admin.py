from django.contrib import admin
from django_q.models import Success, Schedule, Failure, OrmQ

admin.site.unregister(Schedule)
admin.site.unregister(Success)
admin.site.unregister(Failure)
admin.site.unregister(OrmQ)
