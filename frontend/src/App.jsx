import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3001/api/chat';

function App() {
  const [mensagens, setMensagens] = useState([
    {
      tipo: 'assistente',
      conteudo: 'Olá! 🐓 Eu sou o Rodolfo, o mascote do curso de Publicidade e Propaganda da UNIFEBE! Estou aqui para responder todas as suas dúvidas sobre o curso. Como posso ajudar você hoje?'
    }
  ]);
  const [entrada, setEntrada] = useState('');
  const [carregando, setCarregando] = useState(false);
  const fimMensagensRef = useRef(null);

  const rolarParaBaixo = () => {
    fimMensagensRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    rolarParaBaixo();
  }, [mensagens]);

  const enviarMensagem = async () => {
    if (!entrada.trim() || carregando) return;

    const mensagemUsuario = entrada.trim();
    setEntrada('');
    setMensagens(prev => [...prev, { tipo: 'usuario', conteudo: mensagemUsuario }]);
    setCarregando(true);

    try {
      const resposta = await axios.post(API_URL, { message: mensagemUsuario });
      
      setMensagens(prev => [
        ...prev,
        { 
          tipo: 'assistente', 
          conteudo: resposta.data.success 
            ? resposta.data.message 
            : 'Desculpe, ocorreu um erro.' 
        }
      ]);
    } catch (erro) {
      setMensagens(prev => [
        ...prev,
        { tipo: 'assistente', conteudo: 'Erro ao conectar com o servidor.' }
      ]);
    } finally {
      setCarregando(false);
    }
  };

  const aoApertarTecla = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <div className="container-chat">
      <div className="cabecalho-chat">
        <div className="logo-cabecalho">
          <img src="/Rodolfo.png" alt="Rodolfo - Mascote" className="mascote-cabecalho" />
        </div>
        <div className="conteudo-cabecalho">
          <h1>★ UNIFEBE ★</h1>
          <p>Publicidade e Propaganda</p>
          <span className="nome-mascote">apresenta: Rodolfo, o mascote!</span>
        </div>
      </div>

      <div className="area-mensagens">
        {mensagens.map((msg, indice) => (
          <div key={indice} className={`mensagem ${msg.tipo}`}>
            {msg.tipo === 'assistente' && (
              <div className="avatar-mensagem">
                <img src="/Rodolfo.png" alt="Rodolfo" />
              </div>
            )}
            <div className="conteudo-mensagem">
              {msg.conteudo}
            </div>
          </div>
        ))}
        
        {carregando && (
          <div className="mensagem assistente">
            <div className="avatar-mensagem">
              <img src="/Rodolfo.png" alt="Rodolfo" />
            </div>
            <div className="conteudo-mensagem carregando">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={fimMensagensRef} />
      </div>

      <div className="area-input">
        <input
          type="text"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          onKeyDown={aoApertarTecla}
          placeholder="Digite sua pergunta..."
          disabled={carregando}
        />
        <button 
          onClick={enviarMensagem} 
          disabled={carregando || !entrada.trim()}
        >
          <span>{carregando ? '...' : '▶'}</span>
        </button>
      </div>

      <div className="sugestoes">
        <button onClick={() => setEntrada('Como é o curso?')}>
          <span>📚 Sobre o curso</span>
        </button>
        <button onClick={() => setEntrada('Qual a duração do curso?')}>
          <span>⏱️ Duração</span>
        </button>
        <button onClick={() => setEntrada('Quanto custa a mensalidade?')}>
          <span>💰 Mensalidade</span>
        </button>
        <button onClick={() => setEntrada('Onde posso trabalhar?')}>
          <span>💼 Mercado</span>
        </button>
      </div>
    </div>
  );
}

export default App;
