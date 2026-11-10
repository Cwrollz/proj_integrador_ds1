from django.contrib.auth.models import User
from rest_framework.test import APITestCase

from .models import Aviso


class AutenticacaoTests(APITestCase):
    def setUp(self):
        User.objects.create_user('teste', password='senha12345')
        Aviso.objects.create(titulo='Público', conteudo='x', publico=True)
        Aviso.objects.create(titulo='Interno', conteudo='y', publico=False)

    def login(self):
        r = self.client.post('/api/auth/token/', {'username': 'teste', 'password': 'senha12345'})
        self.assertEqual(r.status_code, 200)
        return r.data['access']

    def test_rota_publica_sem_login(self):
        r = self.client.get('/api/avisos/publicos/')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(len(r.data), 1)

    def test_rota_protegida_sem_login_retorna_401(self):
        self.assertEqual(self.client.get('/api/avisos/').status_code, 401)
        self.assertEqual(self.client.get('/api/auth/me/').status_code, 401)

    def test_rota_protegida_com_token(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.login()}')
        self.assertEqual(len(self.client.get('/api/avisos/').data), 2)
        self.assertEqual(self.client.get('/api/auth/me/').data['username'], 'teste')

    def test_login_invalido(self):
        r = self.client.post('/api/auth/token/', {'username': 'teste', 'password': 'errada'})
        self.assertEqual(r.status_code, 401)

    def test_registro(self):
        r = self.client.post('/api/auth/register/', {
            'username': 'novo', 'password': 'Senha@Forte123', 'password2': 'Senha@Forte123',
        })
        self.assertEqual(r.status_code, 201)
        self.assertTrue(User.objects.filter(username='novo').exists())
