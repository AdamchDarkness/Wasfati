import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  if (!Array.isArray(recipes)) {
    return <p>Aucune recette disponible.</p>;
  }

  return (
    <div id="recipeSection" className="recipeSection">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
