from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
    path("prueba/",views.prueba),
    path('posts/', views.post_list, name='post_list'),
    path('posts/<int:pk>/',csrf_exempt(views.post_detail)),
    path('posts/create/', csrf_exempt(views.post_create)),
    path('posts/update/<int:pk>/', csrf_exempt(views.post_update)),
    path('posts/delete/<int:pk>/', csrf_exempt( views.post_delete)),
]
