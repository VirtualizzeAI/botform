# BotForm - Aplicação Web

Aplicação elegante para executar scripts Playwright múltiplas vezes com autenticação segura via Supabase.

## 📋 Pré-requisitos

- Node.js >= 16.0.0
- npm ou yarn
- Conta Supabase ativa

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/VirtualizzeAI/botform.git
cd botform
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do Supabase:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_anonima_aqui
NODE_ENV=development
PORT=3000
```

## 🛠️ Desenvolvimento

### Executar o servidor localmente

```bash
npm run server
```

O servidor estará disponível em `http://localhost:3000`

### Executar o script original (sem frontend)

```bash
npm start
```

## 📁 Estrutura do Projeto

```
botform/
├── src/
│   ├── config/          # Configurações da aplicação
│   ├── public/          # Arquivos estáticos
│   │   ├── index.html   # Dashboard
│   │   ├── login.html   # Página de login
│   │   └── js/
│   │       └── app.js   # JavaScript frontend
├── server.js            # Servidor Express
├── script.js            # Lógica do Playwright
├── index.js             # Script original standalone
├── package.json
├── .env                 # Variáveis de ambiente (não comitar)
├── .env.example         # Template de variáveis
└── README.md
```

## 🔐 Segurança

- As credenciais do Supabase são carregadas do servidor via `/api/config`
- Nunca commit o arquivo `.env` com credenciais reais
- Use `.env.example` como template

## 🌐 Deploy

### Deploy no Vercel

1. Faça push do código para o GitHub
2. Conecte seu repositório no Vercel
3. Configure as variáveis de ambiente no painel do Vercel
4. Vercel fará deploy automaticamente

### Deploy no Heroku

```bash
heroku create seu-app-name
heroku config:set SUPABASE_URL=sua_url
heroku config:set SUPABASE_ANON_KEY=sua_chave
git push heroku main
```

### Deploy em outro servidor

1. Copie os arquivos para o servidor
2. Configure as variáveis de ambiente
3. Execute `npm install` e `npm run server`
4. Use um process manager como PM2:

```bash
npm install -g pm2
pm2 start server.js --name botform
pm2 save
pm2 startup
```

## 📊 Funcionalidades

✅ Autenticação segura com Supabase
✅ Interface moderna e responsiva
✅ Execução de scripts em loop
✅ Indicadores de status em tempo real
✅ Proteção de rotas autenticadas

## 🤝 Contribuindo

Faça um fork, crie uma branch para sua feature e abra um Pull Request.

## 📝 Licença

MIT