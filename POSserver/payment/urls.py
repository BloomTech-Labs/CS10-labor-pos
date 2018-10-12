from .views import checkout
from django.urls import path

urlpatterns = [
  path(r"create-charge/", checkout),
]
