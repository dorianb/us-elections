"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from myproject.views import Summary
from myproject.views import Map
from myproject.views import Timeline

urlpatterns = [
    url(r'^summary(?P<start_time>\d+)/$', Summary.as_view(), name='summary-list'),
    url(r'^map/', Map.as_view(), name='map-list'),
    url(r'^timeline/', Timeline.as_view(), name='timeline-list')
]
