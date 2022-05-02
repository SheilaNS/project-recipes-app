import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import AppContext from '../context/AppContext';

function Carousel() {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const { meals, drinks } = useContext(AppContext);

  const history = useHistory();

  const [content, setContent] = useState([]);
  const [currPage, setCurrPage] = useState(path === 'foods' ? 'Meal' : 'Drink');

  useEffect(() => {
    setContent(path !== 'foods' ? meals : drinks);
    setCurrPage(path !== 'foods' ? 'Meal' : 'Drink');
  }, [meals, drinks, location]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const maxRecipes = 6;

  const handleClick = () => {
    const recipeKey = `id${currPage}`;

    history.push(`${path}/${recipe[recipeKey]}`);
  };

  return (
    <>
      <h2>Recommended Recipes</h2>
      <Slider { ...settings }>
        {content.filter((_curr, index) => index < maxRecipes)
          .map((recipe, index) => (
            <button
              type="button"
              data-testid={ `${index}-recomendation-card` }
              onClick={ handleClick }
              key={ index }
            >
              <img
                className="carousel-img card-img-top"
                data-testid={ `${index}-carousel-img` }
                src={ recipe[`str${currPage}Thumb`] }
                alt={ recipe[`str${currPage}`] }
              />
              <h3 data-testid={ `${index}-recomendation-title` } className="card-title">
                {recipe[`str${currPage}`]}
              </h3>
            </button>
          ))}
      </Slider>
    </>
  );
}

export default Carousel;
