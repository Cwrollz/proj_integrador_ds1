# Projeto Integrador — Desenvolvimento de Sistemas 1

Monorepo com uma API em **Django REST Framework** e um frontend em **Next.js**.

```
proj_integrador_ds1/
├── backend/    # API Django + DRF + JWT (pronta)
├── frontend/   # App Next.js — será criado por você seguindo o tutorial
└── docs/       # Tutorial passo a passo do frontend (.docx)
```

## Etapa 1 — Autenticação

Funcionalidades desta etapa:

- Login com usuário e senha (JWT emitido pelo Django, sessão gerenciada pelo NextAuth)
- Cadastro de novos usuários
- Páginas **públicas**: Início, Avisos
- Páginas **protegidas**: Dashboard, Perfil (redirecionam para o login)
- Renovação automática do token e logout

## Tecnologias

| Camada   | Tecnologias                                                   |
|----------|---------------------------------------------------------------|
| Backend  | Python 3.12+, Django 6, DRF, SimpleJWT, django-cors-headers   |
| Frontend | Node 20+, Next.js 16 (App Router, JavaScript), NextAuth v4, Tailwind CSS 4 |

## Primeiros passos

1. Suba o backend seguindo [backend/README.md](backend/README.md).
2. Siga o tutorial em [docs/Tutorial-Frontend-NextJS.docx](docs/Tutorial-Frontend-NextJS.docx)
   para construir o frontend dentro de `frontend/`.

Com tudo rodando:

- Backend: http://127.0.0.1:8000
- Frontend: http://localhost:3000
