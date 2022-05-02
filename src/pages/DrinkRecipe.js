import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../assets/DrinkRecipe.css';
import Carousel from '../components/Carousel';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchDrinkDetails } from '../services/fetchDrinks';

const copy = require('clipboard-copy');

const doneRecipes = (recipeDetails) => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return recipes ? !recipes
    .some(({ id }) => id === recipeDetails.idDrink)
    : true;
};

const inProgressRecipes = (recipeDetails) => {
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return recipes ? Object.keys(recipes.cocktails)
    .some((key) => key === recipeDetails.idDrink)
    : false;
};

const favoriteRecipes = (recipeDetails) => {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return recipes ? recipes
    .some(({ id }) => id === recipeDetails.idDrink)
    : false;
};

function DrinkRecipe() {
  const location = useLocation();
  const recipeId = location.pathname.split('/')[2];
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const isVisible = doneRecipes(recipeDetails);

  const isInProgress = inProgressRecipes(recipeDetails);

  const isFavorite = favoriteRecipes(recipeDetails);

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
    // console.log('oi');
    // const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    // const today = new Date();
    // const doneRecipe = {
    //   id: recipeDetails.idDrink,
    //   type: 'drink',
    //   nationality: recipeDetails.strArea,
    //   category: recipeDetails.strCategory,
    //   alcoholicOrNot: recipeDetails.strAlcoholic,
    //   name: recipeDetails.strDrink,
    //   image: recipeDetails.strDrinkThumb,
    //   doneDate: today.toLocaleDateString('pt-br'),
    //   tags: recipeDetails.strTags,
    // };
    // if (storage) {
    //   localStorage.setItem('doneRecipes', JSON.stringify([...storage, doneRecipe]));
    // } else {
    //   localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    // }
    history.push(`/drinks/${recipeDetails.idDrink}/in-progress`);
  };

  const handleCopy = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setIsCopied(true);
  };

  const handleFavorite = () => {
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
        onClick={ handleCopy }
      >
        {isCopied ? 'Link copied!' : <img src={ shareIcon } alt="share icon" />}
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
        src={
          isFavorite
            ? blackHeartIcon
            : whiteHeartIcon
        }
      >
        {isFavorite
          ? <img src={ blackHeartIcon } alt="black heart" />
          : <img src={ whiteHeartIcon } alt="white heart" />}

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
          {isInProgress ? 'Continue Recipe' : 'Start'}
        </button>)}
    </div>
  );
}

export default DrinkRecipe;
