from django.urls import path
from . import views

urlpatterns = [
    path('', views.evento_list, name='lista_eventos'),
    path('/<int:evento_id>/', views.evento_detail, name='detalle_evento'),
    path('nuevo/', views.evento_create, name='nuevo_evento'),
    path('editar/<int:evento_id>/', views.evento_update, name='editar_evento'),
    path('eliminar/<int:evento_id>/', views.evento_delete, name='eliminar_evento'),
]
