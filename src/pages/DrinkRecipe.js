import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/DrinkRecipe.css';
import Carousel from '../components/Carousel';
import { fetchDrinkDetails } from '../services/fetchDrinks';

function DrinkRecipe() {
  const location = useLocation();
  const recipeId = location.pathname.split('/')[2];
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const isVisible = doneRecipes ? !doneRecipes
    .some(({ id }) => id === recipeDetails.idDrink)
    : true;

  useEffect(() => {
    const fetchAPI = async () => {
      const details = await fetchDrinkDetails(recipeId);
      setRecipeDetails(details);
      const keys = Object.keys(details).reduce((acc, curr) => {
        if (curr.includes('strIngredient')) {
          acc = [...acc, curr];
        }
        return acc;
      }, []);
      const newIngredients = keys.reduce((acc, curr, index) => {
        if (details[curr] != null) {
          acc = [...acc, {
            ingredient: details[curr],
            measure: details[`strMeasure${index + 1}`],
          }];
        }
        return acc;
      }, []);
      setIngredients(newIngredients);
    };
    fetchAPI();
  }, []);

  const handleClick = () => {
    console.log('oi');
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    const today = new Date();
    const doneRecipe = {
      id: recipeDetails.idDrink,
      type: 'drink',
      nationality: recipeDetails.strArea,
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic,
      name: recipeDetails.strDrink,
      image: recipeDetails.strDrinkThumb,
      doneDate: today.toLocaleDateString('pt-br'),
      tags: recipeDetails.strTags,
    };
    if (storage) {
      localStorage.setItem('doneRecipes', JSON.stringify([...storage, doneRecipe]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    }
  };

  return (
    <div>
      <img
        src={ recipeDetails.strDrinkThumb }
        alt="recipe thumb"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">
        {recipeDetails.strDrink}
      </h3>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <p
        data-testid="recipe-category"
      >
        {`${recipeDetails.strCategory} ${recipeDetails.strAlcoholic}`}
      </p>
      {ingredients.map(({ ingredient, measure }, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ ingredient }
        >
          {`${measure === null ? '' : measure} ${ingredient}`}
        </p>
      ))}
      <p
        data-testid="instructions"
      >
        {recipeDetails.strInstructions}
      </p>
      <Carousel />
      {isVisible && (
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          Start
        </button>)}
    </div>
  );
}

export default DrinkRecipe;
