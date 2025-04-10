import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        navigate('/');
      } else {
        setError(data.message || 'Erreur lors de l’inscription');
      }
    } catch (err) {
      console.error('Erreur lors de l’inscription:', err);
      setError('Une erreur est survenue');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h3>Inscription</h3>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-danger">{error}</div>}
          <div className="form-group">
            <label>Nom d’utilisateur</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">S’inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
