import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import { fetchIngredientsList } from '../services/fetchDrinks';

function DrinkIngredients() {
  const [info, setInfo] = useState([]);
  const { setSearchData } = useContext(AppContext);
  const history = useHistory();
  const numberOfCards = 12;

  const imgIngredient = 'https://www.thecocktaildb.com/images/ingredients/';

  useEffect(() => {
    const test = async () => {
      const result = await fetchIngredientsList();
      const filterResult = result.filter((_element, index) => index < numberOfCards);
      setInfo(filterResult);
    };
    test();
  }, []);
  const handleClick = ({ currentTarget: { name } }) => {
    setSearchData({ filter: 'ingredient', value: name, page: '/drinks' });
    history.push('/drinks');
  };

  return (
    <>
      <Header title="Explore Ingredients" searchOn={ false } />
      <main>
        {
          info.map((ingredient, index) => (
            <button
              type="button"
              data-testid={ `${index}-ingredient-card` }
              key={ index }
              onClick={ handleClick }
              name={ ingredient.strIngredient1 }
            >
              <img
                data-testid={ `${index}-card-img` }
                alt={ `${imgIngredient}${ingredient.strIngredient1} ` }
                src={ `${imgIngredient}${ingredient.strIngredient1}-Small.png` }
              />
              <h1 data-testid={ `${index}-card-name` }>
                { ingredient.strIngredient1 }
              </h1>
            </button>
          ))
        }

      </main>
      <Footer />
    </>
  );
}

export default DrinkIngredients;
