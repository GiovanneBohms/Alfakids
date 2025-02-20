import React, { useState } from 'react';
import "./index.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Validação simples de e-mail
    if (!email) {
      setMessage('Por favor, insira seu e-mail.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Por favor, insira um e-mail válido.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    // Enviar a requisição ao backend
    try {
      const response = await fetch('http://localhost:5000/email/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient: email }), // Envia o campo 'recipient' com o e-mail
      });

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        const data = await response.json(); // Pode retornar uma mensagem da API
        setIsLoading(false);
        setMessage(data.message || 'Instruções para redefinir sua senha foram enviadas para o e-mail.');
      } else {
        // Caso a resposta seja um erro
        setIsLoading(false);
        setMessage('Ocorreu um erro. Tente novamente mais tarde.');
      }
    } catch (error) {
      // Tratamento de erro em caso de falha na requisição
      setIsLoading(false);
      setMessage('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <div className='forgotBody'>
      <h2>Esqueci minha senha</h2>
      <form onSubmit={handleSubmit} className='forgotForm'>
        <br />
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar email'}
        </button>
        <a className='loginLink' href='/login'>Voltar</a>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
