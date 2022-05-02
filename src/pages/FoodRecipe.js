import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { fetchFoodDetails } from '../services/fetchFoods';

function FoodRecipe() {
  const location = useLocation();
  const recipeId = location.pathname.split('/')[2];
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [video, setVideo] = useState('');

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
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Start
      </button>
    </div>
  );
}

export default FoodRecipe;
