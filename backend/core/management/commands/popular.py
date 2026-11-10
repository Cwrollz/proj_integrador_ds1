from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

from core.models import Aviso


class Command(BaseCommand):
    help = 'Cria usuários e avisos de exemplo para testar o sistema.'

    def handle(self, *args, **options):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@exemplo.com', 'admin123')
            self.stdout.write(self.style.SUCCESS('Superusuário admin / admin123 criado.'))
        if not User.objects.filter(username='aluno').exists():
            User.objects.create_user('aluno', 'aluno@exemplo.com', 'aluno123', first_name='Aluno')
            self.stdout.write(self.style.SUCCESS('Usuário aluno / aluno123 criado.'))
        if not Aviso.objects.exists():
            Aviso.objects.bulk_create([
                Aviso(titulo='Bem-vindo ao Projeto Integrador', conteudo='Este aviso é público.', publico=True),
                Aviso(titulo='Inscrições abertas', conteudo='Qualquer visitante pode ler isto.', publico=True),
                Aviso(titulo='Reunião da equipe', conteudo='Aviso interno: só aparece após o login.', publico=False),
            ])
            self.stdout.write(self.style.SUCCESS('Avisos de exemplo criados.'))
