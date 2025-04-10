import React from 'react';

const RecipeCard = ({ recipe }) => {
  const ingredients = recipe.ingredients || [];

  return (
    <div className="card-container">
      <article className="card-recipe">
        <img src={recipe.imgLink} alt={recipe.titre} className="card-image" />
        <h2 className="recipe-name">{recipe.titre}</h2>
        <div className="recipe-time">{recipe.tempsMinute} min</div>
        <div className="card-desc">
          <h3 className="recipe-desc-title">Recette</h3>
          <div className="recipe-desc">{recipe.description}</div>
          <h3 className="recipe-desc-ingredient">Ingrédients</h3>
          <div className="recipe-ingredient">
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <div key={index} className={`ingredient${index + 1}`}>
                  <p className="ingredient-name">{ingredient.nom}</p>
                  <p className="ingredient-quantity">{ingredient.quantite}</p>
                </div>
              ))
            ) : (
              <p>Aucun ingrédient disponible</p>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default RecipeCard;
