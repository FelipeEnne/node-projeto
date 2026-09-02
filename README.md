# Projeto Node — Blog

Aplicação web de blog em Node.js com autenticação de usuários, criação e edição de posts, upload de imagens e recuperação de senha por e-mail.

## Requisitos

- [Node.js](https://nodejs.org/) LTS (recomendado 18+)
- [MongoDB](https://www.mongodb.com/) em execução (local ou remoto)
- Conta SMTP (para envio de e-mails de reset de senha)

## Instalação

```bash
npm install
```

Copie o arquivo de exemplo e preencha as variáveis:

```bash
cp variable.env.example variable.env
```

Edite `variable.env` e inicie o servidor:

```bash
npm start
```

O servidor sobe na porta definida em `PORT` (padrão `7777`).

## Variáveis de ambiente

Configure o arquivo `variable.env` a partir de [`variable.env.example`](variable.env.example):

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

Detalhes de cada variável: [docs/configuration.md](docs/configuration.md).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor com nodemon (`server.js`) |

## Funcionalidades

- Cadastro, login e logout de usuários
- Perfil e alteração de senha
- Recuperação de senha por e-mail (token temporário)
- Listagem de posts na home, com filtro por tags
- Criação e edição de posts (autenticado)
- Upload e redimensionamento de imagens (largura máxima 800px)

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [Arquitetura](docs/architecture.md) | Boot, camadas, auth, upload e e-mail |
| [Rotas](docs/routes.md) | Mapa completo de endpoints |
| [Modelos](docs/models.md) | Schemas User e Post |
| [Configuração](docs/configuration.md) | Variáveis de ambiente e requisitos |

## Estrutura do projeto

```
.
├── app.js                 # Configuração do Express, sessão e Passport
├── server.js              # Conexão com MongoDB e start do servidor
├── helpers.js             # Helpers de view (menu, título)
├── variable.env.example   # Modelo de variáveis de ambiente
├── docs/                  # Documentação detalhada
├── controllers/           # Lógica de rotas (home, posts, usuários)
├── models/                # Schemas Mongoose (User, Post)
├── routes/                # Definição das rotas
├── middlewares/           # Auth e upload/redimensionamento de imagens
├── handlers/              # E-mail e tratamento de erros
├── views/                 # Templates Mustache (.mst)
└── public/                # Assets estáticos e mídia enviada
```

## Stack

- Express
- Mongoose / MongoDB
- Passport (local) + passport-local-mongoose
- Mustache (mustache-express)
- Multer + Jimp (upload e resize de imagens)
- Nodemailer (e-mail)
