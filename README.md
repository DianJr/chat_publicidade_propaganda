# Chatbot UNIFEBE - Publicidade e Propaganda

Chatbot web para responder perguntas sobre o curso de Publicidade e Propaganda do Centro Universitário de Brusque - UNIFEBE.

## Tecnologias

- Frontend: React 
- Backend: Node.js
- IA: Groq (LLaMA 3.3 70B) - API Gratuita 

## Estrutura do Projeto

```
/backend - API Node.js
/frontend - Interface React
```

## Como Rodar

### 1. Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta backend:
```
GROQ_API_KEY=sua_chave_aqui
PORT=3001
```

Para obter a chave da API Groq:
1. Acesse: https://console.groq.com/keys 
2. Faça login ou crie uma conta gratuita
3.Cole a pasta no .env

Inicie o servidor:
```bash
npm start
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

