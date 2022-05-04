import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function Favorites() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const [isCopied, setIsCopied] = useState(false);
  const [renderRecipes, setRenderRecipes] = useState([]);

  const handleCopy = ({ currentTarget: { name, id } }) => {
    console.log(name, id);
    copy(`http://localhost:3000/${name}s/${id}`);
    setIsCopied(true);
  };

  useEffect(() => {
    setRenderRecipes(favoriteRecipes);
  }, []);

  const handleFilter = ({ currentTarget: { name } }) => {
    if (name === 'all') {
      setRenderRecipes(favoriteRecipes);
    } else {
      const newRender = renderRecipes.filter(({ type }) => type === name);
      setRenderRecipes(newRender);
    }
  };

  const handleFavorite = ({ currentTarget: { name } }) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredStorage = storage
      .filter((recipe) => recipe.id !== name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredStorage));
    setRenderRecipes(filteredStorage);
  };

  return (
    <>
      <Header title="Favorite Recipes" searchOn={ false } />
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
      {renderRecipes && renderRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="recipe thumb"
              width="150px"
            />
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>

          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'food'
              ? `${recipe.nationality} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
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
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            name={ recipe.id }
            onClick={ handleFavorite }
            src={ blackHeartIcon }
          >
            <img src={ blackHeartIcon } alt="black heart" />
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

export default Favorites;
