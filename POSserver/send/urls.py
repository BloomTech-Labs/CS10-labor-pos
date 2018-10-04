
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('newuser_text', views.newuser_text, name='newuser'),
    path('newuser_html', views.newuser_html, name="newuser")
    # path('sent/', views.sent_view, name='sent'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)