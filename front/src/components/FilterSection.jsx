import React from 'react';

const FilterSection = ({ totalRecipes = 0 }) => {
  return (
    <section className="filter-container">
      <div className="total-container">
        <h2 className="total-recipes">
          {totalRecipes} recette{totalRecipes > 1 ? 's' : ''}
        </h2>
      </div>
    </section>
  );
};

export default FilterSection;
