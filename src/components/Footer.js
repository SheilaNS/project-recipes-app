import React from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const handleClick = ({ currentTarget: { name } }) => {
    history.push(`/${name}`);
  };

  return (
    <footer
      data-testid="footer"
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        name="drinks"
        onClick={ handleClick }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drink icon" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        name="explore"
        onClick={ handleClick }
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="explore icon" />
      </button>

      <button
        type="button"
        data-testid="food-bottom-btn"
        name="foods"
        onClick={ handleClick }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="meal icon" />
      </button>
    </footer>
  );
}

export default Footer;
