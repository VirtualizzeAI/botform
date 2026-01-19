# 🚀 BotForm v2.0 - Guia Rápido

## ⚡ Quick Start

### 1️⃣ Instalar e Configurar (2 minutos)
```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env.local

# Editar .env.local com suas credenciais Supabase
# NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

### 2️⃣ Criar Tabelas Supabase (1 minuto)
Vá em [Supabase Console](https://app.supabase.com) > SQL Editor e execute:
```sql
-- Tabela de Scripts
CREATE TABLE scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  status VARCHAR DEFAULT 'inactive',
  last_run TIMESTAMP,
  updated_at TIMESTAMP DEFAULT now()
);

-- Tabela de Execuções
CREATE TABLE executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT now(),
  script_id UUID REFERENCES scripts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'running',
  result TEXT,
  error TEXT,
  duration_ms INTEGER
);

-- Indices
CREATE INDEX idx_scripts_user_id ON scripts(user_id);
CREATE INDEX idx_executions_script_id ON executions(script_id);
```

### 3️⃣ Iniciar Servidor (1 minuto)
```bash
npm run dev
# Abra: http://localhost:3000
```

## 📋 Fluxo de Uso

```
┌─────────────────────────────────────┐
│  Visitar http://localhost:3000      │
└────────────────┬────────────────────┘
                 │
        ┌────────▼────────┐
        │ Ir para /auth/signup
        │ Criar nova conta
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │ Fazer login
        │ /auth/login
        └────────┬────────┘
                 │
        ┌────────▼──────────────┐
        │ Dashboard (/dashboard)
        │ Ver estatísticas
        └────────┬──────────────┘
                 │
        ┌────────▼──────────────┐
        │ Scripts (/scripts)
        │ Criar/Editar Scripts
        └────────┬──────────────┘
                 │
        ┌────────▼──────────────┐
        │ Executar Script
        │ Ver Histórico
        └──────────────────────┘
```

## 🎯 Principais Funcionalidades

### 🔐 Autenticação
- ✅ Signup - Criar nova conta
- ✅ Login - Entrar com email/senha
- ✅ Logout - Sair da conta
- ✅ Proteção de rotas - Redireciona para login
- ✅ Sessões automáticas

### 📊 Dashboard
- ✅ Estatísticas em tempo real
- ✅ Listagem de scripts ativos
- ✅ Histórico de atividades
- ✅ Cards informativos
- ✅ Design responsivo

### 🛠️ Gerenciador de Scripts
- ✅ Criar novo script
- ✅ Editar script existente
- ✅ Deletar script
- ✅ Executar script
- ✅ Ver código
- ✅ Status ativo/inativo
- ✅ Histórico de execução

### 👤 Conta do Usuário
- ✅ Ver informações do perfil
- ✅ Alterar senha
- ✅ Preferências do sistema
- ✅ Logout seguro

## 📁 Estrutura de Arquivos

```
src/
├── app/                           # Aplicação Next.js
│   ├── auth/                      # Páginas de autenticação
│   │   ├── login/page.tsx        # Login
│   │   ├── signup/page.tsx       # Signup
│   │   └── callback/page.tsx     # Callback OAuth
│   ├── dashboard/                # Dashboard
│   │   ├── page.tsx              # Dashboard principal
│   │   ├── account/page.tsx      # Configurações
│   │   └── layout.tsx            # Layout com sidebar
│   ├── scripts/                  # Gerenciador de scripts
│   │   └── page.tsx              # CRUD de scripts
│   ├── globals.css               # CSS global
│   ├── layout.tsx                # Layout raiz
│   └── page.tsx                  # Home redirect
├── components/                    # Componentes React
│   ├── Button.tsx                # Botão reutilizável
│   ├── Card.tsx                  # Card reutilizável
│   ├── LoadingSpinner.tsx        # Spinner
│   └── ProtectedRoute.tsx        # Proteção de rotas
├── hooks/                         # Custom hooks
│   └── useAuthSession.ts         # Hook de autenticação
├── lib/                           # Utilitários
│   └── supabase.ts               # Cliente Supabase
├── types/                         # Tipos TypeScript
│   └── database.ts               # Tipos do BD
└── utils/                         # Funções auxiliares
    └── supabase/
        └── client.ts             # Cliente Supabase
```

## 🎨 Páginas Disponíveis

| URL | Descrição | Acesso |
|-----|-----------|--------|
| `/` | Home (redireciona) | Público |
| `/auth/login` | Login | Público |
| `/auth/signup` | Signup | Público |
| `/auth/callback` | Callback OAuth | Privado |
| `/dashboard` | Dashboard | Privado |
| `/dashboard/account` | Configurações | Privado |
| `/scripts` | Gerenciador | Privado |

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor dev

# Build
npm run build            # Build otimizado
npm start                # Inicia servidor prod

# Linting
npm run lint             # Verifica erros

# Docker
docker build -t botform .    # Build imagem
docker-compose up            # Run com Docker Compose
```

## 🌐 Variáveis de Ambiente

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

## 📱 Responsividade

O projeto é 100% responsivo:

- **Mobile** (320px): ✅ Totalmente otimizado
- **Tablet** (768px): ✅ Layout adaptado
- **Desktop** (1024px+): ✅ Layout completo

Sidebar colapsível adapta-se automaticamente ao tamanho da tela.

## 🎨 Customização

### Mudar Cor Principal
Edite `tailwind.config.js`:
```js
colors: {
  primary: {
    600: '#sua-cor-aqui',
    700: '#sua-cor-escura'
  }
}
```

### Mudar Fonte
Edite `src/app/layout.tsx`:
```tsx
import { SuaFonte } from 'next/font/google'
```

## 🚀 Deploy

### Vercel (Recomendado - 2 minutos)
```bash
npm install -g vercel
vercel
# Siga os prompts
```

### Docker (5 minutos)
```bash
docker build -t botform .
docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=... botform
```

### Railway (5 minutos)
1. Conecte GitHub
2. Configure variáveis de ambiente
3. Deploy automático

## 🐛 Troubleshooting

| Erro | Solução |
|------|---------|
| "NEXT_PUBLIC_SUPABASE_URL not defined" | Verifique .env.local |
| "Connection refused" | Reinicie: `npm run dev` |
| "Auth failed" | Verifique credenciais Supabase |
| "RLS Policy error" | Execute SQL do SETUP.md |

## 📚 Documentação Completa

- [README.md](README.md) - Visão geral completa
- [SETUP.md](SETUP.md) - Instalação e configuração
- [DEPLOY.md](DEPLOY.md) - Deployment e produção
- [RESUMO.md](RESUMO.md) - Resumo da refatoração

## 🎓 Stack Tecnológico

- **React 18** - Interface
- **Next.js 14** - Framework
- **TypeScript** - Tipagem
- **Tailwind CSS** - Styling
- **Supabase** - Backend/Auth/DB
- **Lucide Icons** - Ícones
- **Docker** - Containerização

## ✨ Features Principais

✅ Autenticação Supabase
✅ Dashboard com estatísticas
✅ CRUD de scripts
✅ Responsive design
✅ Dark mode ready
✅ TypeScript
✅ Docker ready
✅ SEO optimized
✅ Performance otimizada
✅ Acessibilidade WCAG

## 🎉 Pronto para Usar!

Agora é só iniciar e começar a usar:

```bash
npm install
npm run dev
```

Acesse **http://localhost:3000** e divirta-se! 🚀

---

**Versão**: 2.0.0 | **Status**: ✅ Pronto para Produção
