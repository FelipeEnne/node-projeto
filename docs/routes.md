# Rotas

Todas as rotas HTTP estão em [`routes/index.js`](../routes/index.js). A aplicação renderiza HTML (Mustache); não há API JSON nem comandos CLI.

Arquivos estáticos ficam em `public/` (CSS em `/assets/...`, imagens enviadas em `/media/...`).

## Mapa de rotas

| Método | Path | Auth | Handler / descrição |
|--------|------|------|---------------------|
| GET | `/` | público | Home: lista posts e tags; filtro opcional `?t=tag` |
| GET | `/users/login` | público | Formulário de login |
| POST | `/users/login` | público | Autentica e inicia sessão |
| GET | `/users/register` | público | Formulário de cadastro |
| POST | `/users/register` | público | Cria usuário |
| GET | `/users/forget` | público | Formulário “esqueci a senha” |
| POST | `/users/forget` | público | Envia e-mail com token de reset |
| GET | `/users/reset/:token` | público | Formulário de nova senha (token válido) |
| POST | `/users/reset/:token` | público | Define nova senha |
| GET | `/users/logout` | sessão | Encerra a sessão |
| GET | `/profile` | logado | Página de perfil |
| POST | `/profile` | logado | Atualiza nome e e-mail |
| POST | `/profile/password` | logado | Altera senha (`changePassword`) |
| GET | `/post/add` | logado | Formulário de novo post |
| POST | `/post/add` | logado + upload | Cria post (Multer + resize) |
| GET | `/post/:slug` | público | Visualiza post |
| GET | `/post/:slug/edit` | logado | Formulário de edição |
| POST | `/post/:slug/edit` | logado + upload | Atualiza post (Multer + resize) |
| * | demais paths | — | 404 (`erroHandler.notFound`) |

## Middlewares de proteção e upload

- **`authMiddleware.isLogged`**: exige usuário autenticado; usado em perfil e posts (criar/editar).
- **`authMiddleware.changePassword`**: fluxo de alteração de senha no POST `/profile/password`.
- **`imageMiddleware.upload` + `imageMiddleware.resize`**: encadeados nos POST de `/post/add` e `/post/:slug/edit`.

## Controllers

| Controller | Rotas principais |
|------------|------------------|
| `homeController` | `/` |
| `userController` | `/users/*`, `/profile` |
| `postController` | `/post/*` |
