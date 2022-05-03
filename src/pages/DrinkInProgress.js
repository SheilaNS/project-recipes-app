import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../assets/DrinkRecipe.css';
import Carousel from '../components/Carousel';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchDrinkDetails } from '../services/fetchDrinks';

// data-testid="recipe-photo"
// data-testid="recipe-title"
// data-testid="share-btn"
// data-testid="favorite-btn"
// data-testid="recipe-category"
// data-testid=${index}-ingredient-step
// data-testid="instructions"
// data-testid="finish-recipe-btn"

const doneRecipes = (recipeDetails) => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return recipes ? !recipes
    .some(({ id }) => id === recipeDetails.idDrink)
    : true;
};

const favoriteRecipes = (recipeDetails) => {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(recipes, recipeDetails);
  return recipes ? recipes
    .some(({ id }) => id === recipeDetails.idDrink)
    : false;
};

const toggleFavorite = (recipeDetails) => {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavorite = {
    id: recipeDetails.idDrink,
    type: 'drink',
    nationality: '',
    category: recipeDetails.strCategory,
    alcoholicOrNot: recipeDetails.strAlcoholic,
    name: recipeDetails.strDrink,
    image: recipeDetails.strDrinkThumb,
  };
  if (storage) {
    if (favoriteRecipes(recipeDetails)) {
      const filteredStorage = storage.filter(({ id }) => id !== recipeDetails.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredStorage));
    } else {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...storage, newFavorite]));
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
  }
};

function DrinkInProgress() {
  const location = useLocation();
  const recipeId = location.pathname.split('/')[2];
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const loadFavorite = favoriteRecipes(recipeDetails);
  const [isFavorite, setIsFavorite] = useState(loadFavorite);

  const isVisible = doneRecipes(recipeDetails);

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
      console.log(isFavorite);
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

  useEffect(() => {
    const favorite = favoriteRecipes(recipeDetails);
    setIsFavorite(favorite);
  }, [recipeDetails]);

  const handleClick = () => {
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
    toggleFavorite(recipeDetails);
    const favorite = favoriteRecipes(recipeDetails);
    setIsFavorite(favorite);
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
      {ingredients.filter(({ ingredient }) => ingredient.length !== 0)
        .map(({ ingredient, measure }, index) => (
          <label
            htmlFor={ `${index}-ingredient-step` }
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <input type="checkbox" id={ `${index}-ingredient-step` } />
            <p>
              {`${measure === null ? '' : measure} ${ingredient}`}
            </p>
          </label>
        ))}
      <p
        data-testid="instructions"
      >
        {recipeDetails.strInstructions}
      </p>
      <Carousel />
      {isVisible && (
        <button
          className="finish-recipe-btn"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ handleClick }
        >
          Finish Recipe
        </button>)}
    </div>
  );
}

export default DrinkInProgress;
