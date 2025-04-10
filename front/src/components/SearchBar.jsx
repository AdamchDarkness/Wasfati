import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    onSearch(trimmedQuery); 
  };

  const handleClear = () => {
    setQuery('');
    onSearch(''); 
  };

  return (
    <section>
      <div className="search-container">
        <h1 className="slogan">
          DÉCOUVREZ NOS TENDANCES QUI FLAMBENT PARMI PLUS DE XXX RECETTES
        </h1>
        <form onSubmit={handleSubmit} className="input-container" method="get">
          <label htmlFor="search-input" className="visually-hidden">Rechercher</label>
          <input
            type="text"
            id="search-input"
            name="q"
            placeholder="Rechercher une recette..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
              aria-label="Effacer la recherche"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 17" fill="none">
                <path d="M15 15L8.5 8.5M8.5 8.5L2 2M8.5 8.5L15 2M8.5 8.5L2 15"
                      stroke="#7A7A7A"
                      strokeWidth="2.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <button type="submit" className="search-icon" aria-label="Rechercher">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
              <circle cx="10" cy="10.4219" r="9.5" stroke="white" />
              <line x1="18.3536" y1="19.0683" x2="27.3536" y2="28.0683" stroke="white" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
