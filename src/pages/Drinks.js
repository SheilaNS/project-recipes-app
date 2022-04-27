import React, { useContext } from 'react';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Drinks() {
  const { drinks } = useContext(AppContext);

  return (
    <>
      <Header title="Drinks" searchOn />
      <Footer />
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
    </>
  );
}

export default Drinks;
