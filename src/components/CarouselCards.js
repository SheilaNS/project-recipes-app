import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function CarouselCards({ recipe, index }) {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname.split('/')[1];
  const [currPage, setCurrPage] = useState(path === 'foods' ? 'Meal' : 'Drink');

  useEffect(() => setCurrPage(path === 'foods' ? 'Meal' : 'Drink'), []);

  const handleClick = () => {
    const newPath = `${path}/${recipe[`id${currPage}`]} `;
    console.log(newPath);
    history.push(newPath);
  };

  const generateCard = () => {
    if (recipe) {
      return (
        <>
          <img
            className="carousel-img card-img-top"
            data-testid={ `${index}-carousel-img` }
            src={ recipe[`str${currPage}Thumb`] }
            alt={ recipe[`str${currPage}`] }
          />
          <div className="card-body">
            <h3 data-testid={ `${index}-recomendation-title` } className="card-title">
              {recipe[`str${currPage}`]}
            </h3>
          </div>
        </>);
    }
    return null;
  };

  return (
    <div className="col-md-3">
      <div className="card mb-2">
        <button
          type="button"
          data-testid={ `${index}-recomendation-card` }
          onClick={ handleClick }
        >
          {generateCard()}
        </button>
      </div>
    </div>
  );
}

CarouselCards.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;

export default CarouselCards;
