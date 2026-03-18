# Setup e Instalação - OfficeHub Dashboard

## ✅ Pré-requisitos

- **pnpm** >= 8.0 (recomendado)
- **Node.js** >= 18.0
- **npm** (como fallback)

## 📦 Instalação

### 1. Instalar pnpm (se não tiver)

```bash
npm install -g pnpm
```

### 2. Instalar dependências

```bash
# Na raiz do projeto
pnpm install
```

Isso instalará todas as dependências para **client** e **server** usando workspaces do pnpm.

## 🚀 Executar o projeto

### Desenvolvimento paralelo (cliente + servidor)

```bash
pnpm dev
```

### Apenas cliente (frontend)

```bash
pnpm client
# Acessa: http://localhost:5173
```

### Apenas servidor (backend)

```bash
pnpm server
# API disponível em: http://localhost:3001
```

## 🏗️ Build para produção

```bash
# Build de ambos (client e server)
pnpm build

# Build apenas do cliente
pnpm build:client

# Build apenas do servidor
pnpm build:server
```

## ▶️ Executar produção

```bash
pnpm start
```

## 📁 Estrutura do Projeto

```
officehub-dashboard/
├── client/                    # Frontend React + Vite
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # APIs
│   │   ├── Dashboard.tsx      # Componente principal
│   │   ├── main.tsx           # Entry point
│   │   └── types.ts           # Tipos TypeScript
│   ├── public/                # Assets estáticos
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── server/                    # Backend Node.js + Express
│   ├── src/
│   │   ├── controllers/       # Lógica de requisições
│   │   ├── services/          # Camada de serviços
│   │   ├── models/            # DB models
│   │   ├── middleware/        # Middleware Express
│   │   ├── routes/            # Definição de rotas
│   │   └── server.ts          # Entry point
│   ├── package.json
│   └── tsconfig.json
│
└── shared/                    # Código compartilhado
    └── types.ts               # Tipos compartilhados
```

## ⚙️ Configurações importantes

### .npmrc (raiz)
Garante comportamento correto do pnpm:
- `shamefully-hoist=true` - Eleva dependências para compatibilidade
- `strict-peer-dependencies=false` - Não nega peer dependencies opcionais

## 🔌 APIs

### Cliente
- **URL base:** http://localhost:5173
- **Proxy API:** /api → http://localhost:3001/api

### Servidor
- **Port:** 3001 (padrão, pode ser configurado com `PORT` env)
- **Health check:** GET http://localhost:3001/api/health
- **Apps API:** http://localhost:3001/api/apps

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do servidor se necessário:

```
PORT=3001
NODE_ENV=development
```

## 🐛 Troubleshooting

### "pnpm: command not found"
```bash
npm install -g pnpm
```

### Erro de conflito de dependências
```bash
pnpm install --force
# ou
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Porta já em uso
```bash
# Cliente
pnpm dev --port 5174

# Servidor
PORT=3002 pnpm server
```

## 📚 Tecnologias

### Frontend
- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- Framer Motion (animações)
- Lucide React (ícones)

### Backend
- Node.js 18+
- Express 4
- TypeScript 5
- TSX (TypeScript runner)
- CORS

## ✨ Features

- **Dashboard minimalista** - Interface limpa e responsiva
- **Bento Grid Layout** - Cards organizados em grid
- **PWA** - Instalável em Windows, Android e iOS
- **API REST** - Backend com Express
- **Tipado com TypeScript** - Type-safe em todo o projeto
- **Monorepo com pnpm workspaces** - Gestão eficiente
