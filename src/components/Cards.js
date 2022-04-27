import PropTypes from 'prop-types';
import React from 'react';
import '../assets/Cards.css';

function Cards({ recipe }) {
  const { recipeName, recipeImg, index } = recipe;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        className="card-img"
        data-testid={ `${index}-card-img` }
        src={ recipeImg }
        alt={ recipeName }
      />
      <h3 data-testid={ `${index}-card-name` }>{recipeName}</h3>
    </div>
  );
}

Cards.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Cards;
