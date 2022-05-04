import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory( );

  const [randomDrinkURL, randomDrinkData] = useState();

  const fetchRandomDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    randomDrinkData(data.drinks[0].idDrink);
  };

  useEffect(() => { fetchRandomDrink(); }, []);

  const handleClickExploreIngredient = () => {
    history.push('/explore/drinks/ingredients');
  };

  const handleClickExploreNationalities = () => {
    history.push('/explore/drinks/nationalities');
  };

  const handleClickSurpriseMe = () => {
    history.push(`/drinks/${randomDrinkURL}`);
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
          onClick={ handleClickSurpriseMe }
        >
          Surprise me!
        </button>
      </main>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
