from django.conf.urls import url
from .views import checkout

urlpatterns = [url(r"^create-charge/$", checkout, name="cout")]
