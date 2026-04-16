# Chatbot UNIFEBE - Publicidade e Propaganda

Assistente virtual para o curso de Publicidade e Propaganda da UNIFEBE, disponível em versão web e Telegram.

## Tecnologias

- Frontend: React + Vite
- Backend: Node.js + Express
- IA: Groq API (LLaMA 3.3 70B)
- Bot: node-telegram-bot-api

## Instalação

### Backend

```bash
cd backend
npm install
```

Configure as variáveis de ambiente criando um arquivo `.env` na pasta backend (use o `.env.example` como referência):

```env
GROQ_API_KEY=sua_chave_groq_aqui
PORT=3001
TELEGRAM_BOT_TOKEN=seu_token_telegram_aqui
```

Para obter a chave da API Groq: https://console.groq.com/keys

Inicie o servidor:
```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

### Bot do Telegram (opcional)

```bash
cd backend
npm run telegram
```

## Estrutura do Projeto

```
├── backend/
│   ├── server.js          # Servidor Express
│   ├── chatService.js     # Integração com Groq API
│   ├── telegramBot.js     # Bot do Telegram
│   └── .env.example       # Exemplo de configuração
├── frontend/
│   └── src/
│       ├── App.jsx        # Componente principal
│       └── App.css        # Estilos
└── prompt.md              # Instruções para a IA
```

## Funcionalidades

- Chat interativo sobre o curso de Publicidade e Propaganda
- Respostas contextualizadas sobre grade curricular, mensalidades, corpo docente
- Interface web moderna e responsiva
- Bot do Telegram integrado
- Sugestões rápidas de perguntas

## Licença

MIT


