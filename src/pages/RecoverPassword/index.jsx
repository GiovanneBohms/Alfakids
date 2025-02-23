import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { updateStudentPassword } from '../../services/StudentService';
import "./index.css"


export function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate()

  // Hook para pegar a URL
  const location = useLocation();
  
  // Função para pegar os parâmetros da URL (query string)
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get('token');  // Aqui pegamos o 'token' que foi passado na URL
  };

  const token = getQueryParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== newPasswordConfirmation) {
      setError('As senhas não coincidem.');
      setSuccessMessage('');
      
    } else {
      setError('');
      updateStudentPassword(email, newPassword).then(() => {
        navigate("/login")
      })
      setSuccessMessage('Senha alterada com sucesso!');
      
    }
  };

  const isTokenValid = (token) => {
    if (!token) {
      return false;
    }
  
    try {
      const decoded = jwtDecode(token); // Decodifica o JWT
      const currentTime = Date.now() / 1000; // Obtém o tempo atual em segundos (o JWT usa segundos)
      
      console.log(decoded)

      if (decoded.exp < currentTime) {
        // O token expirou
        return false;
      }
      
      setEmail(decoded.recipient)
      return true; // Token válido
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return false; // Se o token não for válido ou ocorrer um erro na decodificação
    }
  };

  useEffect(() => {
    if(!isTokenValid(token)){
      navigate("/login")
    }
  }, [])

  return (
    <div className="recoverContent">
      <h2>Recuperação de Senha</h2>
      <form onSubmit={handleSubmit} className='recoverForm'>
        <div className="input-group">
          <label htmlFor="email">E-mail:</label>
          <label id='recipientLabel'>{email}</label>
        </div>

        <div className="input-group">
          <label htmlFor="newPassword">Nova Senha:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Digite sua nova senha"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="newPasswordConfirmation">Confirme sua Senha:</label>
          <input
            type="password"
            id="newPasswordConfirmation"
            name="newPasswordConfirmation"
            value={newPasswordConfirmation}
            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
            placeholder="Confirme sua nova senha"
            required
          />
        </div>

        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <button type="submit" className="submitButton">
          Confirmar
        </button>
      </form>
    </div>
  );
}
