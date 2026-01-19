#!/bin/bash

# 🚀 Script de Início Rápido do BotForm

echo "🎉 BotForm - Sistema de Automação Moderno"
echo "=========================================="
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null
then
    echo -e "${RED}❌ Node.js não está instalado${NC}"
    echo "   Instale em: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js detectado: $(node -v)${NC}"
echo ""

# Passo 1: Instalar dependências
echo -e "${YELLOW}📦 Passo 1: Instalando dependências...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# Passo 2: Verificar arquivo .env.local
echo -e "${YELLOW}🔐 Passo 2: Configurando variáveis de ambiente...${NC}"

if [ ! -f .env.local ]; then
    echo "📝 Criando .env.local..."
    cp .env.example .env.local
    echo -e "${YELLOW}⚠️  Edite o arquivo .env.local com suas credenciais Supabase:${NC}"
    echo "   NEXT_PUBLIC_SUPABASE_URL=..."
    echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=..."
    echo ""
    read -p "Pressione ENTER depois de configurar o .env.local..."
fi

echo -e "${GREEN}✅ Variáveis de ambiente configuradas${NC}"
echo ""

# Passo 3: Iniciar servidor
echo -e "${YELLOW}🚀 Passo 3: Iniciando servidor de desenvolvimento...${NC}"
echo ""
echo -e "${GREEN}✨ Servidor rodando em: http://localhost:3000${NC}"
echo ""
echo "📖 Documentação:"
echo "  • README.md - Visão geral do projeto"
echo "  • SETUP.md - Guia de instalação completo"
echo "  • DEPLOY.md - Instruções de deployment"
echo ""

npm run dev
