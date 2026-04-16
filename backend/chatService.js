import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

function loadPrompt() {
  try {
    const promptPath = path.join(__dirname, '..', 'prompt.md');
    return fs.readFileSync(promptPath, 'utf-8');
  } catch (error) {
    console.warn('Arquivo prompt.md não encontrado, usando prompt padrão');
    return 'Você é um assistente virtual do curso de Publicidade e Propaganda da UNIFEBE.';
  }
}

export async function generateResponse(userMessage) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_API_KEY) {
    return {
      success: false,
      message: 'Configuração da API não encontrada.'
    };
  }

  const systemPrompt = loadPrompt();
  const requestBody = {
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    model: 'llama-3.3-70b-versatile'
  };

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: data.choices[0].message.content
    };
    
  } catch (error) {
    return {
      success: false,
      message: 'Desculpe, ocorreu um erro. Tente novamente.'
    };
  }
}
