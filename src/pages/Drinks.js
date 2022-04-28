import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
          const maxCategories = 6;
          if (index < maxCategories) acc = [...acc, curr];
          return acc;
        }, [])
        .map(({ strCategory }, index) => {
          const allIndex = 5;
          if (index === allIndex) {
            return (
              <button
                type="button"
                key="All"
                data-testid="All-category-filter"
                onClick={ handleClick }
              >
                All
              </button>
            );
          }
          return (
            <button
              key={ strCategory }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              value={ strCategory }
              onClick={ handleClick }
            >
              {strCategory}
            </button>
          );
        })}
      {drinks.length > 1 && (
        drinks.reduce((acc, curr, index) => {
          const maxCards = 12;
          if (index < maxCards) acc = [...acc, curr];
          return acc;
        }, [])
          .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
            <Link
              key={ index }
              to={ `/drinks/${idDrink}` }
            >
              <Cards
                recipe={ { recipeName: strDrink, recipeImg: strDrinkThumb, index } }
              />
            </Link>
          ))
      )}
      <Footer />
    </>
  );
}

export default Drinks;
