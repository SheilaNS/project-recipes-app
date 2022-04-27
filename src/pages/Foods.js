import React, { useContext } from 'react';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Foods() {
  const { meals } = useContext(AppContext);

  return (
    <>
      <Header title="Foods" searchOn />
      <Footer />
      {meals.length > 1 && (
        meals.map(({ strMeal, strMealThumb }, index) => {
          const maxCards = 10;
          if (index < maxCards) {
            return (<Cards
              recipe={ { recipeName: strMeal, recipeImg: strMealThumb, index } }
              key={ index }
            />);
          }
          return null;
        })
      )}
    </>
  );
}

export default Foods;
