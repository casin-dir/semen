from django.conf.urls import url
from django.contrib import admin

from semen.views import Landing, NewOrder, MapView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', Landing.as_view()),
    url(r'^order', NewOrder.as_view()),
    url(r'^map', MapView.as_view()),

]
