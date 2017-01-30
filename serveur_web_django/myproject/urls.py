from django.conf.urls import url, include
from myproject.views import Summary, Map, Timeline

urlpatterns = [
    url(r'^summary/', Summary.as_view(), name='summary-list'),
    url(r'^map/', Map.as_view(), name='map-list'),
    url(r'^timeline/', Timeline.as_view(), name='map-list')
]
