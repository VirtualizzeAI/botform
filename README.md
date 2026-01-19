# BotForm - Plataforma Moderna de Automação

Uma aplicação web moderna, responsiva e bonita construída com React, Next.js e Tailwind CSS para executar scripts Playwright com autenticação segura via Supabase.

## ✨ Recursos

- 🎨 **Design Moderno e Responsivo** - Interface elegante que funciona perfeitamente em todos os dispositivos
- 🔐 **Autenticação Segura** - Integração completa com Supabase Auth
- ⚡ **Performance** - Built com Next.js 14 para máxima performance
- 📱 **Mobile First** - Totalmente responsivo e otimizado para mobile
- 🎯 **Dashboard Intuitivo** - Gerenciamento fácil de scripts e execuções
- 📊 **Análise em Tempo Real** - Monitore suas automações
- 🛠️ **Gerenciador de Scripts** - Crie, edite e execute scripts facilmente

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Conta Supabase ativa

## 🚀 Quick Start

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
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

### 4. Execute em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000` em seu navegador

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Home/Redirect
│   ├── layout.tsx            # Layout principal
│   ├── globals.css           # Estilos globais
│   ├── auth/
│   │   ├── login/page.tsx   # Página de login
│   │   ├── signup/page.tsx  # Página de cadastro
│   │   └── callback/page.tsx # Callback do OAuth
│   ├── dashboard/
│   │   ├── page.tsx         # Dashboard principal
│   │   └── layout.tsx       # Layout do dashboard
│   └── scripts/
│       └── page.tsx         # Gerenciador de scripts
├── utils/
│   └── supabase/
│       └── client.ts        # Cliente Supabase
└── types/
    └── database.ts          # Tipos TypeScript
```

## 🎯 Fluxo de Autenticação

1. Usuário acessa `/auth/login` ou cria conta em `/auth/signup`
2. Supabase autentica o usuário via email/senha
3. Após autenticação, redireciona para `/dashboard`
4. Dashboard carrega dados do usuário autenticado
5. Usuário pode gerenciar scripts em `/scripts`

## 🗄️ Banco de Dados (Supabase)

Você precisa criar as seguintes tabelas:

### Tabela: scripts
```sql
CREATE TABLE scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT now(),
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  status VARCHAR DEFAULT 'inactive',
  last_run TIMESTAMP
);
```

### Tabela: executions
```sql
CREATE TABLE executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT now(),
  script_id UUID REFERENCES scripts(id),
  status VARCHAR DEFAULT 'running',
  result TEXT,
  error TEXT
);
```

## 🎨 Customização

### Cores Primárias
Edite `tailwind.config.js` para mudar as cores:

```js
colors: {
  primary: {
    600: '#4f46e5', // Mude para sua cor
  }
}
```

### Fontes
Modifique `src/app/layout.tsx`:

```tsx
import { YourFont } from 'next/font/google'
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Outras Plataformas
A aplicação é compatível com qualquer plataforma que suporte Next.js:
- Railway
- Render
- AWS Amplify
- Digital Ocean

## 📝 Licença

MIT - Sinta-se livre para usar em seus projetos

## 🤝 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.

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