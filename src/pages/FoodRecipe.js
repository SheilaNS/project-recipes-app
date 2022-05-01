import React from 'react';

function FoodRecipe() {
  // foto => data-testid="recipe-photo"
  // título => data-testid="recipe-title"
  // botão de compartilhar => data-testid="share-btn"
  // botão de favoritar => data-testid="favorite-btn"
  // texto da categoria(ou se é ou não alcoólico) => data-testid="recipe-category"
  // ingredientes => data-testid={ `${index}-ingredient-name-and-measure` }
  // instruções => data-testid="instructions"
  // vídeo da tela de comidas(somente) => data-testid="video"
  // receitas recomendadas(card) => data-testid={ `${index}-recomendation-card` }
  // botão iniciar => data-testid="start-recipe-btn"

  return (
    <div>
      <img
        src=""
        alt="drink thumb"
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
      <div className="video-responsive">
        <iframe
          width="853"
          height="480"
          data-testid="video"
          src="https://www.youtube.com/embed/"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
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

export default FoodRecipe;
