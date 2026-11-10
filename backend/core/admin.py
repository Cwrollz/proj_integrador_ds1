from django.contrib import admin

from .models import Aviso


@admin.register(Aviso)
class AvisoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'publico', 'criado_em']
    list_filter = ['publico']
    search_fields = ['titulo', 'conteudo']
