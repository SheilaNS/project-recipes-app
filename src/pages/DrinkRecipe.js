import React from 'react';

function DrinkRecipe() {
  return (
    <div>
      <img
        src=""
        alt="recipe thumb"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">
        Title
      </h3>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <p
        data-testid="recipe-category"
      >
        Category
      </p>
      <p
        data-testid={ `${0}-ingredient-name-and-measure` }
      >
        Ingredient
      </p>
      <p
        data-testid="instructions"
      >
        Instructions
      </p>
      <div
        data-testid={ `${0}-recomendation-card` }
      >
        Card Recommended
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Start
      </button>
    </div>
  );
}

export default DrinkRecipe;
