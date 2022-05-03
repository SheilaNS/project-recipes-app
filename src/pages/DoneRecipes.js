import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const [isCopied, setIsCopied] = useState(false);
  const [renderRecipes, setRenderRecipes] = useState(doneRecipes);

  const handleCopy = ({ currentTarget: { name, id } }) => {
    console.log(name, id);
    copy(`http://localhost:3000/${name}s/${id}`);
    setIsCopied(true);
  };

  useEffect(() => {
    setRenderRecipes(doneRecipes);
  }, []);

  const handleFilter = ({ currentTarget: { name } }) => {
    if (name === 'all') {
      setRenderRecipes(doneRecipes);
    } else {
      const newRender = renderRecipes.filter(({ type }) => type === name);
      setRenderRecipes(newRender);
    }
  };

  return (
    <>
      <Header title="Done Recipes" searchOn={ false } />
      <div className="buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="all"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="food"
          onClick={ handleFilter }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </div>
      {renderRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt="recipe thumb"
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'food'
              ? `${recipe.nationality} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            name={ recipe.type }
            id={ recipe.id }
            onClick={ handleCopy }
            src={ shareIcon }
          >
            {isCopied ? 'Link copied!' : <img src={ shareIcon } alt="share icon" />}
          </button>
          {recipe.tags && recipe.tags.map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

export default DoneRecipes;
