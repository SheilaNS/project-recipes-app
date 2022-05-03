import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const history = useHistory();

  const handleClickExploreIngredient = () => {
    history.push('/explore/foods/ingredients');
  };

  const handleClickExploreNationalities = () => {
    history.push('/explore/foods/nationalities');
  };

  return (
    <>
      <Header title="Explore Foods" searchOn={ false } />
      <main>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ handleClickExploreIngredient }
        >
          By Ingredients
        </button>

        <button
          data-testid="explore-by-nationality"
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

export default ExploreFoods;
