"""
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('test_email', views.test_email, name='welcome'),
]
"""
