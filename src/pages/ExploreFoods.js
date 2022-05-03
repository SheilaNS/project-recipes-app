import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const history = useHistory();

  const [randomFoodsURL, randomFoodData] = useState();

  const fetchRandomFood = async () => {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await request.json();
    randomFoodData(data.meals[0].idMeal);
  };

  useEffect(() => { fetchRandomFood(); }, []);

  const handleClickExploreIngredient = () => {
    history.push('/explore/foods/ingredients');
  };

  const handleClickExploreNationalities = () => {
    history.push('/explore/foods/nationalities');
  };

  const handleClickSurpriseMe = () => {
    history.push(`/foods/${randomFoodsURL}`);
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
          onClick={ handleClickSurpriseMe }
        >
          Surprise me!
        </button>
      </main>
      <Footer />
    </>
  );
}

export default ExploreFoods;
