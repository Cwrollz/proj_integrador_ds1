from django.db import models


class Aviso(models.Model):
    """Aviso do sistema. Avisos públicos aparecem para visitantes;
    os internos (publico=False) só para usuários autenticados."""

    titulo = models.CharField(max_length=200)
    conteudo = models.TextField()
    publico = models.BooleanField(default=True, help_text='Visível sem login?')
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-criado_em']

    def __str__(self):
        return self.titulo
