import React, { useState } from 'react';

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

    try {
      // Realiza a requisição para o backend
      const response = await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Passando o e-mail no corpo da requisição
      });

      const data = await response.json();

      if (response.ok) {
        // Caso o envio do e-mail seja bem-sucedido
        setMessage('Instruções para redefinir sua senha foram enviadas para o e-mail.');
      } else {
        // Caso haja algum erro (e-mail não encontrado ou erro no backend)
        setMessage(data.error || 'Ocorreu um erro. Tente novamente mais tarde.');
      }
    } catch (error) {
      setIsLoading(false);
      setMessage('Ocorreu um erro. Tente novamente mais tarde.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Esqueci minha senha</h2>
      <form onSubmit={handleSubmit}><br />
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
