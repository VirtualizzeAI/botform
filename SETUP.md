# BotForm - Instalação Rápida

## 📦 Instalação e Configuração

### 1️⃣ Instale as dependências

```bash
npm install
```

### 2️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

**Como obter suas credenciais Supabase:**
1. Acesse [Supabase Console](https://app.supabase.com)
2. Clique no seu projeto
3. Vá em "Settings" > "API"
4. Copie `Project URL` e `anon public key`

### 3️⃣ Crie as tabelas no Supabase

Vá ao Supabase Console > SQL Editor e execute:

```sql
-- Tabela de Scripts
CREATE TABLE scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  status VARCHAR DEFAULT 'inactive' CHECK (status IN ('active', 'inactive')),
  last_run TIMESTAMP,
  updated_at TIMESTAMP DEFAULT now()
);

-- Tabela de Execuções
CREATE TABLE executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT now(),
  script_id UUID REFERENCES scripts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'running' CHECK (status IN ('success', 'error', 'running')),
  result TEXT,
  error TEXT,
  duration_ms INTEGER
);

-- Indices para melhor performance
CREATE INDEX idx_scripts_user_id ON scripts(user_id);
CREATE INDEX idx_scripts_status ON scripts(status);
CREATE INDEX idx_executions_script_id ON executions(script_id);
CREATE INDEX idx_executions_user_id ON executions(user_id);
CREATE INDEX idx_executions_created_at ON executions(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE executions ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para scripts
CREATE POLICY "Usuários podem ver seus próprios scripts"
  ON scripts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar scripts"
  ON scripts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus scripts"
  ON scripts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus scripts"
  ON scripts FOR DELETE
  USING (auth.uid() = user_id);

-- Políticas RLS para execuções
CREATE POLICY "Usuários podem ver suas próprias execuções"
  ON executions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar execuções"
  ON executions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 4️⃣ Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`

## 🎯 Próximas Etapas

1. **Crie uma conta** em `/auth/signup`
2. **Acesse o dashboard** em `/dashboard`
3. **Crie seu primeiro script** em `/scripts`
4. **Execute e gerencie** seus scripts

## 🔗 Links Úteis

- [Documentação Supabase](https://supabase.com/docs)
- [Documentação Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## ⚠️ Troubleshooting

### Erro: "NEXT_PUBLIC_SUPABASE_URL not defined"
- Verifique se o arquivo `.env.local` existe
- Confirme se as variáveis estão corretamente definidas
- Reinicie o servidor: `npm run dev`

### Erro: "Supabase connection failed"
- Verifique sua conexão com internet
- Confirme se o URL e a chave estão corretos
- Verifique os CORS settings no Supabase

### Erro de autenticação
- Verifique se as políticas RLS foram criadas
- Confirme que você completou a verificação de email
- Limpe os cookies do navegador e tente novamente
