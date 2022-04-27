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
        drinks.map(({ strDrink, strDrinkThumb }, index) => {
          const maxCards = 12;
          if (index < maxCards) {
            return (<Cards
              recipe={ { recipeName: strDrink, recipeImg: strDrinkThumb, index } }
              key={ index }
            />);
          }
          return null;
        })
      )}
    </>
  );
}

export default Drinks;
