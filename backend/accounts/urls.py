from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import MeView, RegisterView

urlpatterns = [
    # Login: recebe {username, password} e devolve {access, refresh}
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Renova o access token: recebe {refresh} e devolve {access}
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MeView.as_view(), name='me'),
]
