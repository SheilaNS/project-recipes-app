import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../assets/DrinkRecipe.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchDrinkDetails } from '../services/fetchDrinks';

const copy = require('clipboard-copy');

const favoriteRecipes = (recipeDetails) => {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return recipes ? recipes
    .some(({ id }) => id === recipeDetails.idDrink)
    : false;
};

const inProgressRecipes = (recipeDetails) => {
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const isInProgress = recipes ? Object.keys(recipes.cocktails)
    .some((key) => key === recipeDetails.idDrink)
    : false;
  if (isInProgress) return recipes.cocktails[recipeDetails.idDrink];
  return [];
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

const checkLocalStorage = (recipeDetails, value, localUsed, usedIngredients) => {
  if (localUsed) {
    const { cocktails } = localUsed;
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...localUsed,
      cocktails: {
        ...cocktails, [recipeDetails.idDrink]: [...usedIngredients, value],
      } }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {},
      cocktails: {
        [recipeDetails.idDrink]: [...usedIngredients, value],
      } }));
  }
};

const renderImg = (isFavorite) => (isFavorite
  ? <img src={ blackHeartIcon } alt="black heart" />
  : <img src={ whiteHeartIcon } alt="white heart" />);

function DrinkInProgress() {
  const location = useLocation();
  const recipeId = location.pathname.split('/')[2];
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const loadFavorite = favoriteRecipes(recipeDetails);
  const [isFavorite, setIsFavorite] = useState(loadFavorite);
  const [usedIngredients, setUsedIngredients] = useState([]);

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
      setIngredients(newIngredients.filter(({ ingredient }) => ingredient.length !== 0));
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const favorite = favoriteRecipes(recipeDetails);
    setIsFavorite(favorite);
  }, [recipeDetails]);

  useEffect(() => {
    const savedIngredients = inProgressRecipes(recipeDetails);
    setUsedIngredients(savedIngredients);
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
    history.push('/done-recipes');
  };

  const handleCopy = () => {
    copy(`http://localhost:3000/drinks/${recipeDetails.idDrink}`);
    setIsCopied(true);
  };

  const handleFavorite = () => {
    toggleFavorite(recipeDetails);
    const favorite = favoriteRecipes(recipeDetails);
    setIsFavorite(favorite);
  };

  const handleChange = ({ target: { value, checked } }) => {
    const localUsed = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (checked) {
      setUsedIngredients([...usedIngredients, value]);
      checkLocalStorage(recipeDetails, value, localUsed, usedIngredients);
    } else {
      const newUsed = usedIngredients.filter((ingredient) => ingredient !== value);
      setUsedIngredients(newUsed);
      const { cocktails } = localUsed;
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({
          ...localUsed, cocktails: { ...cocktails, [recipeDetails.idDrink]: newUsed },
        }));
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
        {renderImg(isFavorite) }

      </button>
      <p
        data-testid="recipe-category"
      >
        {`${recipeDetails.strCategory} ${recipeDetails.strAlcoholic}`}
      </p>
      {ingredients
        .map(({ ingredient, measure }, index) => (
          <label
            htmlFor={ `${index}-ingredient-step` }
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `${index}-ingredient-step` }
              value={ `${measure} ${ingredient}` }
              checked={ usedIngredients ? usedIngredients
                .includes(`${measure} ${ingredient}`) : false }
              onChange={ handleChange }
            />
            <p>
              {`${measure} ${ingredient}`}
            </p>
          </label>
        ))}
      <p
        data-testid="instructions"
      >
        {recipeDetails.strInstructions}
      </p>
      <button
        className="finish-recipe-btn"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
        disabled={ ingredients.length !== usedIngredients.length }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default DrinkInProgress;
