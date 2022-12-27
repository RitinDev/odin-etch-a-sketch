# Set up url routing for the etchasketch app

from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('', views.index, name='index'),
]