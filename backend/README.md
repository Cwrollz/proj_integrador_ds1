# Backend — Django REST Framework

API com autenticação JWT (SimpleJWT) consumida pelo frontend Next.js.

## Como rodar

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate          # Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py popular        # cria usuários e avisos de exemplo
python manage.py runserver
```

A API fica em http://127.0.0.1:8000/api/ e o admin em http://127.0.0.1:8000/admin/.

Usuários criados pelo comando `popular`:

| Usuário | Senha    | Perfil        |
|---------|----------|---------------|
| admin   | admin123 | superusuário  |
| aluno   | aluno123 | usuário comum |

Testes automatizados: `python manage.py test`

## Endpoints

| Método | Rota                        | Acesso    | Descrição                                          |
|--------|-----------------------------|-----------|----------------------------------------------------|
| POST   | `/api/auth/token/`          | público   | Login. Envia `{username, password}`, recebe `{access, refresh}` |
| POST   | `/api/auth/token/refresh/`  | público   | Envia `{refresh}`, recebe um novo `{access}`       |
| POST   | `/api/auth/token/verify/`   | público   | Verifica se um token é válido                      |
| POST   | `/api/auth/register/`       | público   | Cadastro: `{username, email, first_name, last_name, password, password2}` |
| GET    | `/api/auth/me/`             | protegido | Dados do usuário logado                            |
| GET    | `/api/avisos/publicos/`     | público   | Avisos marcados como públicos                      |
| GET    | `/api/avisos/`              | protegido | Todos os avisos (inclusive internos)               |
| GET    | `/api/dashboard/`           | protegido | Resumo para a área logada                          |

Rotas protegidas exigem o cabeçalho `Authorization: Bearer <access>`.
Sem ele, a API responde **401 Unauthorized**.

O access token dura **15 minutos** e o refresh token **1 dia**
(veja `SIMPLE_JWT` em `config/settings.py`).

## Estrutura

```
backend/
├── config/        # settings, urls raiz
├── accounts/      # login (JWT), cadastro e /me
└── core/          # modelo Aviso, dashboard, comando "popular"
```

## Teste rápido com curl

```bash
curl -X POST http://127.0.0.1:8000/api/auth/token/ \
     -H "Content-Type: application/json" \
     -d '{"username": "aluno", "password": "aluno123"}'

curl http://127.0.0.1:8000/api/auth/me/ -H "Authorization: Bearer <access>"
```
