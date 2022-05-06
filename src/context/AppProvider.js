import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinkByCat, fetchDrinkCat, fetchDrinks } from '../services/fetchDrinks';
import { fetchFoodByCat, fetchFoodCat, fetchMeals } from '../services/fetchFoods';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [searchData, setSearchData] = useState({ filter: '', value: '', page: '' });
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState({ food: [], drink: [] });
  const [filterCategory, setFilterCategory] = useState({ category: '', page: '' });
  const history = useHistory();

  const fetchAPI = async () => {
    const newMeals = await fetchMeals({ filter: '', value: '' });
    setMeals(newMeals);
    const food = await fetchFoodCat();
    const newDrinks = await fetchDrinks({ filter: '', value: '' });
    setDrinks(newDrinks);
    const drink = await fetchDrinkCat();
    setCategories({ food, drink });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchSearchAPI = async () => {
      const isNull = (arg, func) => {
        if (arg === null) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        } else func(arg);
      };
      const { filter, value } = searchData;
      if (filter.length && value.length) {
        if (searchData.page === '/foods') {
          const newData = await fetchMeals({ filter, value });
          isNull(newData, setMeals);
        } else {
          const newData = await fetchDrinks({ filter, value });
          isNull(newData, setDrinks);
        }
      }
    };
    fetchSearchAPI();
  }, [searchData]);

  useEffect(() => {
    const fetchCatAPI = async () => {
      const { category, page } = filterCategory;
      if (category !== '') {
        if (page === '/foods') {
          const newData = await fetchFoodByCat(category);
          setMeals(newData);
        } else {
          const newData = await fetchDrinkByCat(category);
          setDrinks(newData);
        }
      } else fetchAPI();
    };
    fetchCatAPI();
  }, [filterCategory]);

  useEffect(() => {
    const redirectSingleMeal = () => {
      if (meals.length === 1 && filterCategory.category !== 'Goat') {
        history.push(`/foods/${meals[0].idMeal}`);
      }
    };
    redirectSingleMeal();
  }, [meals]);

  useEffect(() => {
    const redirectSingleDrink = () => {
      if (drinks.length === 1) {
        history.push(`/drinks/${drinks[0].idDrink}`);
      }
    };
    redirectSingleDrink();
  }, [drinks]);

  return (
    <AppContext.Provider
      value={ {
        setSearchData,
        meals,
        drinks,
        categories,
        filterCategory,
        setFilterCategory,
      } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
