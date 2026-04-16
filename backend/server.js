import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateResponse } from './chatService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ 
    message: 'API Chatbot UNIFEBE - Publicidade e Propaganda',
    status: 'online'
  });
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!message?.trim()) {
    return res.status(400).json({ success: false, error: 'Mensagem vazia' });
  }
  
  const response = await generateResponse(message);
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  if (!process.env.GROQ_API_KEY) {
    console.warn('GROQ_API_KEY não configurada');
  }
});
