from django.conf.urls import url
from django.contrib import admin

from semen.views import Landing

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', Landing.as_view()),
]
