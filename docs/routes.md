# Rotas

Todas as rotas HTTP estão em [`routes/index.js`](../routes/index.js). A aplicação renderiza HTML (Mustache); não há API JSON nem comandos CLI.

Arquivos estáticos ficam em `public/` (CSS em `/assets/...`, imagens enviadas em `/media/...`).

## Mapa de rotas

| Método | Path | Auth | Handler / descrição |
|--------|------|------|---------------------|
| GET | `/` | público | Home: lista posts e tags; filtro opcional `?t=tag` |
| GET | `/users/login` | público | Formulário de login |
| POST | `/users/login` | público + rate limit + CSRF | Autentica, regenera sessão e inicia login |
| GET | `/users/register` | público | Formulário de cadastro |
| POST | `/users/register` | público + rate limit + CSRF | Cria usuário |
| GET | `/users/forget` | público | Formulário “esqueci a senha” |
| POST | `/users/forget` | público + rate limit + CSRF | Envia e-mail com token de reset (resposta genérica) |
| GET | `/users/reset/:token` | público | Formulário de nova senha (token válido) |
| POST | `/users/reset/:token` | público + rate limit + CSRF | Define nova senha |
| POST | `/users/logout` | sessão + CSRF | Encerra a sessão |
| GET | `/profile` | logado | Página de perfil |
| POST | `/profile` | logado + CSRF | Atualiza nome e e-mail |
| POST | `/profile/password` | logado + CSRF | Altera senha (exige senha atual) |
| GET | `/post/add` | logado | Formulário de novo post |
| POST | `/post/add` | logado + upload + CSRF | Cria post (Multer + resize) |
| GET | `/post/:slug` | público | Visualiza post |
| GET | `/post/:slug/edit` | logado | Formulário de edição (somente autor) |
| POST | `/post/:slug/edit` | logado + upload + CSRF | Atualiza post (somente autor) |
| * | demais paths | — | 404 (`erroHandler.notFound`) |

## Middlewares de proteção, CSRF e upload

- **`authMiddleware.isLogged`**: exige usuário autenticado; usado em perfil e posts (criar/editar).
- **`authMiddleware.changePassword`**: fluxo de alteração de senha no POST `/profile/password` (valida senha atual).
- **`csrfMiddleware.validateCsrf`**: valida token CSRF em todos os POSTs.
- **`authLimiter`**: rate limit (10 req / 15 min) em login, register, forget e reset.
- **`imageMiddleware.upload` + `imageMiddleware.resize`**: encadeados nos POST de `/post/add` e `/post/:slug/edit` (limite 5MB; CSRF após o upload).

## Controllers

| Controller | Rotas principais |
|------------|------------------|
| `homeController` | `/` |
| `userController` | `/users/*`, `/profile` |
| `postController` | `/post/*` |
