import React from 'react';

function Footer() {
  const handleClick = ({ target: { name } }) => {
    console.log(name);
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
      >
        DRINKS ICON
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        name="explore"
        onClick={ handleClick }
      >
        EXPLORE ICON
      </button>

      <button
        type="button"
        data-testid="food-bottom-btn"
        name="food"
        onClick={ handleClick }
      >
        FOODS ICON
      </button>
    </footer>
  );
}

export default Footer;
