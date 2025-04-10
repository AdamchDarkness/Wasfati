import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddRecipe.css';

const AddRecipe = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [tempsMinute, setTempsMinute] = useState('');
  const [imgLink, setImgLink] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [nomIngredient, setNomIngredient] = useState('');
  const [quantiteIngredient, setQuantiteIngredient] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');

    if (isEditMode) {
      fetch(`http://localhost:8080/api/recettes/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitre(data.titre);
          setDescription(data.description);
          setTempsMinute(data.tempsMinute);
          setImgLink(data.imgLink);
          setIngredients(data.ingredients || []);
        })
        .catch(() => setError("Impossible de charger la recette"));
    }
  }, [id, isEditMode, navigate]);

  const addIngredient = () => {
    if (!nomIngredient.trim() || !quantiteIngredient.trim()) {
      alert("Nom et quantité requis");
      return;
    }

    setIngredients([...ingredients, { nom: nomIngredient, quantite: quantiteIngredient }]);
    setNomIngredient('');
    setQuantiteIngredient('');
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const recette = {
      titre,
      description,
      tempsMinute: parseInt(tempsMinute, 10),
      imgLink,
      ingredients
    };

    const method = isEditMode ? 'PUT' : 'POST';
    const endpoint = isEditMode
      ? `http://localhost:8080/api/recettes/${id}`
      : 'http://localhost:8080/api/recettes';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recette),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || "Erreur lors de l'envoi");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion");
    }
  };

  return (
    <div className="container mt-5">
      <h1>{isEditMode ? 'Modifier' : 'Créer'} une recette</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titre" className="form-label">Titre</label>
          <input type="text" id="titre" className="form-control" value={titre} onChange={(e) => setTitre(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="tempsMinute" className="form-label">Temps (min)</label>
          <input type="number" id="tempsMinute" className="form-control" value={tempsMinute} onChange={(e) => setTempsMinute(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="imgLink" className="form-label">Lien image</label>
          <input type="text" id="imgLink" className="form-control" value={imgLink} onChange={(e) => setImgLink(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Ingrédients</label>
          <ul className="list-group mb-2">
            {ingredients.map((ing, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                {ing.nom} - {ing.quantite}
                <button className="btn btn-sm btn-danger" onClick={() => removeIngredient(index)}>X</button>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2">
            <input type="text" className="form-control" placeholder="Nom" value={nomIngredient} onChange={(e) => setNomIngredient(e.target.value)} />
            <input type="text" className="form-control" placeholder="Quantité" value={quantiteIngredient} onChange={(e) => setQuantiteIngredient(e.target.value)} />
            <button type="button" className="btn btn-secondary" onClick={addIngredient}>Ajouter</button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Mettre à jour' : 'Créer'} la recette
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
