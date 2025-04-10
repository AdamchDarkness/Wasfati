import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <header>
      <div className="container-header container-fluid">
        <div>
          <img src="/img/background.png" alt="background" className="background-img img-fluid" />
        </div>
      </div>
      <nav className="header-nav">
        <ul>
          {!token ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>Bienvenue, {username} !</li>
              <li>
                <button className="" onClick={handleLogout}>Logout</button>
              </li>
              <li>
                <Link to="/add-recipe" className="add-recipe-btn">
                  Ajouter une recette
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
