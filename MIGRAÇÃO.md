# BotForm - Sistema Refatorado ✨

## 🎉 Sistema Completamente Refatorado!

O BotForm foi completamente refatorado com **React, Next.js 14, Tailwind CSS** e integração moderna com **Supabase**.

## ✨ Principais Melhorias

### 🎨 Design Moderno
- **UI/UX Responsiva** - Funciona perfeitamente em desktop, tablet e mobile
- **Gradientes Modernos** - Design elegante com cores primárias harmônicas
- **Animações Suaves** - Transições e efeitos visuais profissionais
- **Componentes Reutilizáveis** - Arquitetura limpa e escalável

### 🔐 Autenticação Supabase
- **Signup/Login Seguros** - Autenticação via email e senha
- **Gerenciamento de Sessão** - Controle automático de sessões
- **Proteção de Rotas** - Rotas protegidas com redirecionamento automático
- **Recuperação de Senha** - Sistema integrado (pronto para expandir)

### ⚡ Performance
- **Next.js 14** - Framework React moderno com otimizações
- **SSR/SSG Pronto** - Possibilidade de renderização no servidor
- **Tailwind CSS** - Styling otimizado e bundle pequeno
- **TypeScript** - Tipagem estática para código seguro

### 📱 Funcionalidades

#### Dashboard
- **Estatísticas em Tempo Real** - Cards informativos com dados
- **Gerenciador de Scripts** - Criar, editar, executar e deletar scripts
- **Histórico de Atividades** - Log de execuções e eventos
- **Sidebar Responsiva** - Navegação intuitiva

#### Gerenciador de Scripts
- **CRUD Completo** - Create, Read, Update, Delete
- **Editor de Código** - Campo para código Playwright
- **Status de Scripts** - Ativo/Inativo
- **Histórico de Execuções** - Última execução registrada

#### Configurações de Conta
- **Perfil do Usuário** - Informações de email e ID
- **Alterar Senha** - Sistema seguro de mudança de senha
- **Preferências** - Sistema preparado para expansão

## 📁 Estrutura do Projeto

```
/workspaces/botform/
├── src/
│   ├── app/
│   │   ├── auth/              # Autenticação
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── callback/
│   │   ├── dashboard/         # Dashboard Principal
│   │   │   ├── account/
│   │   │   └── layout.tsx
│   │   ├── scripts/           # Gerenciador de Scripts
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.tsx         # Layout raiz
│   │   └── page.tsx           # Home
│   ├── components/            # Componentes reutilizáveis
│   ├── hooks/                 # Custom React Hooks
│   ├── lib/                   # Utilitários
│   ├── types/                 # Tipos TypeScript
│   └── utils/                 # Funções auxiliares
├── package.json               # Dependências
├── tailwind.config.js         # Configuração Tailwind
├── tsconfig.json              # Configuração TypeScript
├── next.config.js             # Configuração Next.js
├── Dockerfile                 # Deploy Docker
├── docker-compose.yml         # Docker Compose
├── README.md                  # Documentação Principal
├── SETUP.md                   # Guia de Instalação
└── DEPLOY.md                  # Guia de Deploy
```

## 🚀 Como Começar

### 1. Instale as Dependências
```bash
npm install
```

### 2. Configure o Supabase
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite com suas credenciais Supabase
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 3. Crie as Tabelas no Supabase
Execute o SQL em Supabase > SQL Editor:
[Ver SETUP.md para o script SQL completo]

### 4. Inicie o Servidor
```bash
npm run dev
```

Acesse: **http://localhost:3000**

## 🎯 Próximos Passos

1. **Criar Conta** - Acesse `/auth/signup`
2. **Fazer Login** - Acesse `/auth/login`
3. **Explorar Dashboard** - Veja as estatísticas
4. **Criar Scripts** - Acesse `/scripts` e crie seu primeiro script
5. **Executar Scripts** - Clique em "Executar" para testar

## 📦 Dependências Principais

- **next@14.2.35** - Framework React
- **@supabase/supabase-js@2.38.4** - Cliente Supabase
- **tailwindcss@3.3.0** - Styling CSS
- **lucide-react@0.292.0** - Ícones
- **typescript@5.3.2** - Tipagem estática

## 🔒 Segurança

- ✅ Variáveis de ambiente protegidas
- ✅ Autenticação via Supabase
- ✅ Row Level Security (RLS) configurado
- ✅ CORS habilitado apropriadamente
- ✅ Senhas com mínimo 6 caracteres

## 📊 Responsividade

- ✅ Mobile First Design
- ✅ Breakpoints Tailwind (sm, md, lg, xl)
- ✅ Sidebar Colapsível
- ✅ Componentes Adaptativos
- ✅ Imagens Responsivas

## 🎨 Temas e Customização

### Cores
Edite `tailwind.config.js`:
```js
colors: {
  primary: {
    600: '#seu-cor', // Mude aqui
    700: '#sua-cor-escura'
  }
}
```

### Fontes
Edite `src/app/layout.tsx`:
```tsx
import { SuaFonte } from 'next/font/google'
```

## 🐳 Deploy com Docker

```bash
# Build da imagem
docker build -t botform:latest .

# Run do container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=... \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  botform:latest
```

## 🚀 Deploy em Produção

### Vercel (Recomendado)
```bash
vercel
# Configure variáveis de ambiente na dashboard
```

### Railway
1. Conecte seu GitHub
2. Configure variáveis de ambiente
3. Deploy automático

## 📞 Suporte

- [Documentação Supabase](https://supabase.com/docs)
- [Documentação Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📝 Licença

MIT - Livre para usar em seus projetos

---

**BotForm v2.0.0** - Última atualização: Janeiro 2024 ✨
