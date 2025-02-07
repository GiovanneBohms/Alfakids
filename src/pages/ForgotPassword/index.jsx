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

    // Simulação de chamada à API para recuperação de senha
    try {
      // Aqui você faria a requisição para o seu backend, por exemplo:
      // await fetch('/api/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });

      // Simulando uma resposta positiva
      setTimeout(() => {
        setIsLoading(false);
        setMessage('Instruções para redefinir sua senha foram enviadas para o e-mail.');
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setMessage('Ocorreu um erro. Tente novamente mais tarde.');
    }
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
