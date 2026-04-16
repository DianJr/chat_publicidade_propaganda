import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { generateResponse } from './chatService.js';

dotenv.config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TELEGRAM_TOKEN) {
  console.error('Falta o TELEGRAM_BOT_TOKEN no .env');
  process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 
    'Olá! Sou um assistente virtual do curso de Publicidade e Propaganda da UNIFEBE.\n\n' +
    'Posso ajudar com informações sobre grade curricular, mensalidades, corpo docente, projetos, mercado de trabalho e muito mais!'
  );
});

bot.onText(/\/ajuda/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    'Comandos disponíveis:\n' +
    '/start - Iniciar conversa\n' +
    '/ajuda - Ver comandos\n' +
    '/contato - Informações de contato\n\n' +
    'Você também pode enviar perguntas diretamente, como:\n' +
    '• Qual o valor da mensalidade?\n' +
    '• Quais disciplinas tem na primeira fase?\n' +
    '• Como é o mercado de trabalho?'
  );
});

bot.onText(/\/contato/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    'Coordenação do Curso:\n\n' +
    'Prof. Thiago dos Santos\n' +
    'publicidadeepropaganda@unifebe.edu.br\n' +
    '(47) 3211-7215 / (47) 3211-7218\n\n' +
    'Instagram: @ppunifebe\n' +
    'linktr.ee/ppunifebe'
  );
});

bot.on('message', async (msg) => {
  if (msg.text?.startsWith('/')) return;
  
  const chatId = msg.chat.id;
  const userMessage = msg.text;
  
  if (!userMessage?.trim()) return;
  
  bot.sendChatAction(chatId, 'typing');
  
  try {
    const response = await generateResponse(userMessage);
    
    if (response.success) {
      bot.sendMessage(chatId, response.message);
    } else {
      bot.sendMessage(chatId, 'Ops, deu erro aqui. Tenta de novo?');
    }
  } catch (error) {
    console.error('Erro:', error);
    bot.sendMessage(chatId, 'Deu ruim, tenta mandar de novo.');
  }
});

