import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();

  const handleClickExploreIngredient = () => {
    history.push('/explore/drinks/ingredients');
  };

  const handleClickExploreNationalities = () => {
    history.push('/explore/drinks/nationalities');
  };

  return (
    <>
      <Header title="Explore Drinks" searchOn={ false } />
      <main>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ handleClickExploreIngredient }
        >
          By Ingredients
        </button>

        <button
          data-testid="explore-by-nationalit"
          type="button"
          onClick={ handleClickExploreNationalities }
        >
          By Nationality
        </button>

        <button
          data-testid="explore-surprise"
          type="button"
        >
          Surprise me!
        </button>
      </main>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
