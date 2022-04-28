import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Foods() {
  const { meals, categories, filterCategory, setFilterCategory } = useContext(AppContext);
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
      <Header title="Foods" searchOn />
      {categories.food && categories.food
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
              { strCategory }
            </button>
          );
        })}
      {meals.length && (
        meals.reduce((acc, curr, index) => {
          const maxCards = 12;
          if (index < maxCards) acc = [...acc, curr];
          return acc;
        }, [])
          .map(({ strMeal, strMealThumb }, index) => (<Cards
            recipe={ { recipeName: strMeal, recipeImg: strMealThumb, index } }
            key={ index }
          />))
      )}
      <Footer />
    </>
  );
}

export default Foods;
