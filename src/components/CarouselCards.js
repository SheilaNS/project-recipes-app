import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function CarouselCards({ recipe, index }) {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const [currPage, setCurrPage] = useState(path === 'foods' ? 'Meal' : 'Drink');

  return (
    <div>
      <Link to={ `${path}/${recipe[`id${currPage}`]}` }>
        <div data-testid={ `${index}-recomendation-card` }>
          <img
            className="carousel-img"
            data-testid={ `${index}-carousel-img` }
            src={ recipe[`str${currPage}Thumb`] }
            alt={ recipe[`str${currPage}`] }
          />
          <h3 data-testid={ `${index}-recomendation-title` }>
            {recipe[`str${currPage}`]}
          </h3>
        </div>
      </Link>
    </div>
  );
}

CarouselCards.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default CarouselCards;
