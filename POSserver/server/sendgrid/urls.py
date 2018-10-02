from django.urls import path
from . import views

urlpatterns=[
  # sends to views
  path("test_email/", views.test_email, name="index")
]


