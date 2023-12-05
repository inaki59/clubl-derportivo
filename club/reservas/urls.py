from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.reserva_create, name='reserva_create'),
    path('editar/<int:pk>/', views.reserva_update, name='reserva_update'),
    path('eliminar/<str:code>/', views.reserva_delete, name='reserva_delete'),
    path('', views.reserva_list, name='reserva_list'),
    path('<str:pista>/<int:numero_pista>/',views.reserva_list_filter),
    path('<int:pk>/', views.reserva_detail, name='reserva_detail'),
]
