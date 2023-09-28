from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_views
urlpatterns = [
    path("",views.home),
    path('social/', include('social_django.urls', namespace='social')),
    path("login/", views.login, name="login"),

    path("logout/", auth_views.LogoutView.as_view(), name="logout")
]
