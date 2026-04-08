from django.urls import path
from .views import RegistroView, LoginView, LogoutView, PerfilView

urlpatterns = [
    path('registrar-estudiante/', RegistroView.as_view()), # ENDPOINT PARA REGISTRAR ESTUDIANTES
    path('login/',                LoginView.as_view()), # ENDPOINT PARA LOGIN
    path('logout/',               LogoutView.as_view()),   # ENDPOINT PARA LOGOUT
    path('perfil/',               PerfilView.as_view()),    # ENDPOINT PARA OBTENER Y ACTUALIZAR PERFIL DEL USUARIO LOGUEADO
]
