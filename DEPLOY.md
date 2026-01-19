# Deploy do BotForm

Aqui estão os passos para fazer deploy da aplicação em produção.

## 🚀 Vercel (Recomendado)

### 1. Instale o Vercel CLI

```bash
npm install -g vercel
```

### 2. Faça deploy

```bash
vercel
```

### 3. Configure as variáveis de ambiente

Na dashboard do Vercel:
- Vá em Settings > Environment Variables
- Adicione suas variáveis:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🐳 Docker

### 1. Build da imagem

```bash
docker build -t botform:latest .
```

### 2. Run do container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  botform:latest
```

### 3. Docker Compose

```bash
docker-compose up -d
```

## ☁️ Railway

### 1. Conecte seu GitHub

1. Acesse [Railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub"

### 2. Configure variáveis de ambiente

Na Railway, vá em Variables e adicione:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🌐 Render

### 1. Crie um Web Service

1. Vá em [render.com](https://render.com)
2. Clique em "New +" > "Web Service"
3. Conecte seu repositório

### 2. Configure

- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- Adicione as variáveis de ambiente

## 📊 Monitoramento

### Vercel Analytics

Habilitado automaticamente no Vercel. Acesse em Dashboard > Analytics

### Logs

```bash
# Vercel
vercel logs

# Railway
railway logs

# Render
render logs
```

## ⚠️ Checklist pré-deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados (Supabase) criado
- [ ] RLS policies ativadas
- [ ] CORS configurado no Supabase
- [ ] Teste de login/signup funcionando
- [ ] Build local sem erros: `npm run build`

## 🔒 Variáveis de Ambiente

Mude para PRODUÇÃO:
- Verifique se `NEXT_PUBLIC_SUPABASE_URL` aponta para produção
- Gere uma nova chave anon para produção no Supabase

## 📞 Suporte

Qualquer problema, check:
1. Console do navegador (F12)
2. Logs da plataforma de deploy
3. Supabase Status: https://status.supabase.com

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