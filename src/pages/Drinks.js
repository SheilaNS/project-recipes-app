import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Drinks() {
  const {
    drinks, categories, filterCategory, setFilterCategory,
  } = useContext(AppContext);
  const location = useLocation();

  const handleClick = ({ target: { value } }) => {
    if (filterCategory.category === value) {
      setFilterCategory({ category: '', page: location.pathname });
    } else {
      setFilterCategory({ category: value, page: location.pathname });
    }
  };

  return (
    <>
      <Header title="Drinks" searchOn />
      {categories.drink && categories.drink
        .reduce((acc, curr, index) => {
          const maxCategories = 5;
          if (index < maxCategories) acc = [...acc, curr];
          return acc;
        }, [])
        .map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            value={ strCategory }
            onClick={ handleClick }
          >
            {strCategory}
          </button>
        ))}
      {drinks.length > 1 && (
        drinks.reduce((acc, curr, index) => {
          const maxCards = 12;
          if (index < maxCards) acc = [...acc, curr];
          return acc;
        }, [])
          .map(({ strDrink, strDrinkThumb }, index) => (<Cards
            recipe={ { recipeName: strDrink, recipeImg: strDrinkThumb, index } }
            key={ index }
          />))
      )}
      <Footer />
    </>
  );
}

export default Drinks;
