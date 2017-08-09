from django.contrib import admin
from django_q.models import Success, Schedule, Failure, OrmQ

from semen.models import FeedBack


class FeedBackAdmin(admin.ModelAdmin):
    list_display = ('id','user_avatar', 'feedback_link', 'feedback_image', 'user_nickname', 'feedback_likes','feedback_comments','feedback_text')
    list_filter = ('id',)


admin.site.register(FeedBack, FeedBackAdmin)

admin.site.unregister(Schedule)
admin.site.unregister(Success)
admin.site.unregister(Failure)
admin.site.unregister(OrmQ)
