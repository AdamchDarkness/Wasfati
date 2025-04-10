import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username.trim());
        navigate('/');
      } else {
        setError(data.message || 'Login ou mot de passe incorrect');
      }
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      setError('Une erreur est survenue');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-header">
          <h3>Connexion</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="text-danger">{error}</div>}
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-key"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Se souvenir de moi</label>
            </div>
            <div className="form-group">
              <button type="submit" className="login-btn">
                Se connecter
              </button>
            </div>
          </form>
        </div>
        <div className="links">
          <a href="/register">Pas encore de compte ? S'inscrire</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
