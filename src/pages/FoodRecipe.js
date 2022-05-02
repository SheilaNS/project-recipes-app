import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../assets/FoodRecipe.css';
import Carousel from '../components/Carousel';
import { fetchFoodDetails } from '../services/fetchFoods';

function FoodRecipe() {
  const location = useLocation();
  const recipeId = location.pathname.split('/')[2];
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [video, setVideo] = useState('');
  const history = useHistory();

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const isVisible = doneRecipes ? !doneRecipes
    .some(({ id }) => id === recipeDetails.idMeal)
    : true;
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const isInProgress = inProgressRecipes ? Object.keys(inProgressRecipes.meals)
    .some((key) => key === recipeDetails.idMeal)
    : false;

  useEffect(() => {
    const fetchAPI = async () => {
      const details = await fetchFoodDetails(recipeId);
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
      const videoKey = details.strYoutube.split('=')[1];
      setVideo(videoKey);
    };
    fetchAPI();
  }, []);

  const handleClick = () => {
    // const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    // const today = new Date();
    // const doneRecipe = {
    //   id: recipeDetails.idMeal,
    //   type: 'food',
    //   nationality: recipeDetails.strArea,
    //   category: recipeDetails.strCategory,
    //   alcoholicOrNot: '',
    //   name: recipeDetails.strMeal,
    //   image: recipeDetails.strMealThumb,
    //   doneDate: today.toLocaleDateString('pt-br'),
    //   tags: recipeDetails.strTags,
    // };
    // if (storage) {
    //   localStorage.setItem('doneRecipes', JSON.stringify([...storage, doneRecipe]));
    // } else {
    //   localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    // }
    history.push(`/foods/${recipeDetails.idMeal}/in-progress`);
  };

  return (
    <div>
      <img
        src={ recipeDetails.strMealThumb }
        alt="drink thumb"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">
        {recipeDetails.strMeal}
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
        {recipeDetails.strCategory}
      </p>
      {ingredients.map(({ ingredient, measure }, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ ingredient }
        >
          {`${measure} ${ingredient}`}
        </p>
      ))}
      <p
        data-testid="instructions"
      >
        {recipeDetails.strInstructions}
      </p>
      <div className="video-responsive">
        <iframe
          width="560"
          height="315"
          data-testid="video"
          src={ `https://www.youtube.com/embed/${video}` }
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
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

export default FoodRecipe;
