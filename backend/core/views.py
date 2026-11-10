from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Aviso
from .serializers import AvisoSerializer


class AvisoPublicoListView(generics.ListAPIView):
    """GET /api/avisos/publicos/ - qualquer visitante pode ver."""

    serializer_class = AvisoSerializer
    permission_classes = [AllowAny]
    queryset = Aviso.objects.filter(publico=True)


class AvisoListView(generics.ListAPIView):
    """GET /api/avisos/ - todos os avisos (inclusive internos). Exige login."""

    serializer_class = AvisoSerializer
    permission_classes = [IsAuthenticated]
    queryset = Aviso.objects.all()


class DashboardView(APIView):
    """GET /api/dashboard/ - dados resumidos para a área logada."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        nome = request.user.first_name or request.user.username
        return Response({
            'mensagem': f'Olá, {nome}!',
            'total_usuarios': User.objects.count(),
            'total_avisos': Aviso.objects.count(),
            'avisos_internos': Aviso.objects.filter(publico=False).count(),
        })
