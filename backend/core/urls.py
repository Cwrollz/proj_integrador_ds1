from django.urls import path

from .views import AvisoListView, AvisoPublicoListView, DashboardView

urlpatterns = [
    path('avisos/publicos/', AvisoPublicoListView.as_view(), name='avisos_publicos'),
    path('avisos/', AvisoListView.as_view(), name='avisos'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
