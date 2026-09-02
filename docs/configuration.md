# Configuração

## Requisitos

- Node.js LTS 18+
- MongoDB (local ou remoto)
- Conta SMTP para e-mails de recuperação de senha

## Arquivo de ambiente

A aplicação carrega variáveis de [`variable.env`](../server.js) (não `.env`):

```js
require('dotenv').config({ path: 'variable.env' })
```

1. Copie o exemplo:

```bash
cp variable.env.example variable.env
```

2. Preencha os valores reais.
3. **Não versione** `variable.env` com segredos — o arquivo está no `.gitignore`.

## Variáveis

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `DATABASE` | sim | URI de conexão do MongoDB |
| `PORT` | não | Porta HTTP (padrão `7777`) |
| `SECRET` | sim | Segredo para cookies e sessão |
| `SMTP_HOST` | para reset | Host do servidor SMTP |
| `SMTP_PORT` | para reset | Porta SMTP |
| `SMTP_USER` | para reset | Usuário SMTP |
| `SMTP_PASS` | para reset | Senha SMTP |
| `SMTP_NAME` | para reset | Nome exibido no remetente |
| `SMTP_EMAIL` | para reset | E-mail do remetente |

Exemplo (também em [`variable.env.example`](../variable.env.example)):

```env
DATABASE=mongodb://localhost:27017/blog
PORT=7777
SECRET=uma-chave-secreta-forte

SMTP_HOST=smtp.exemplo.com
SMTP_PORT=587
SMTP_USER=usuario
SMTP_PASS=senha
SMTP_NAME=Blog
SMTP_EMAIL=noreply@exemplo.com
```

## Sessão

`express-session` usa store **em memória** por padrão. Adequado para desenvolvimento; em produção com vários processos, use um store persistente (por exemplo Redis ou Mongo).

## Subir a aplicação

```bash
npm install
cp variable.env.example variable.env
# edite variable.env
npm start
```

O servidor imprime a porta em uso no console.
