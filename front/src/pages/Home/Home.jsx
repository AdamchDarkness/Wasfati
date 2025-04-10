import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar';
import FilterSection from '../../components/FilterSection';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const size = 15;

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const fetchRecipes = async (page = 1, query = '') => {
    try {
      setLoading(true);
      let url;
      if (query.trim() !== '') {
        url = `http://localhost:8080/api/recettes/search?query=${encodeURIComponent(query)}&page=${page - 1}&size=${size}`;
      } else {
        url = `http://localhost:8080/api/recettes?page=${page - 1}&size=${size}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setRecipes(data.content || []);
      setTotalRecipes(data.totalElements || 0);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.trim());
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette recette ?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:8080/api/recettes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRecipes(currentPage, searchQuery);
    } catch (err) {
      console.error('Erreur lors de la suppression', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <Header />
      <main id="main">
        <div className="d-flex justify-content-between align-items-center px-4 pt-3">
          <SearchBar onSearch={handleSearch} />
          {username && (
            <div className="text-end">
              <p>Bienvenue, <strong>{username}</strong></p>
            </div>
          )}
        </div>

        <FilterSection totalRecipes={totalRecipes} />

        {loading ? (
          <p className="text-center mt-4">Chargement en cours...</p>
        ) : (
          <>
            <div className="container">
              <div className="row">
                {recipes.map((recette) => (
                  <div key={recette.id} className="col-md-4 mb-4">
                    <div className="card h-100">
                      <img src={recette.imgLink} className="card-img-top" alt={recette.titre} />
                      <div className="card-body">
                        <h5 className="card-title">{recette.titre}</h5>
                        <p className="card-text">{recette.description}</p>
                        <p className="card-text"><strong>Temps :</strong> {recette.tempsMinute} min</p>
                        <p className="card-text"><strong>Ingrédients :</strong></p>
                        <ul>
                          {recette.ingredients.map((ing, idx) => (
                            <li key={idx}>{ing.nom} - {ing.quantite}</li>
                          ))}
                        </ul>
                      </div>
                      {username && username === recette.createdBy && (
                        <div className="card-footer d-flex justify-content-between">
                          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(recette.id)}>Modifier</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(recette.id)}>Supprimer</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
