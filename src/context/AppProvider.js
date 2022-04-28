import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  fetchDrinkCategories,
  fetchDrinks,
  fetchFilterDrinkCategories,
} from '../services/fetchDrinks';
import {
  fetchFoodCategories,
  fetchMeals,
  // fetchFilterFoodCategories,
} from '../services/fetchFoods';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [searchData, setSearchData] = useState({ filter: '', value: '', page: '' });
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState({ food: [], drink: [] });
  const [filterCategory, setFilterCategory] = useState({ category: '', page: '' });
  const history = useHistory();

  useEffect(() => {
    const fetchAPI = async () => {
      const newMeals = await fetchMeals(searchData);
      setMeals(newMeals);
      const food = await fetchFoodCategories();
      const newDrinks = await fetchDrinks(searchData);
      setDrinks(newDrinks);
      const drink = await fetchDrinkCategories();
      setCategories({ food, drink });
    };
    fetchAPI();
  }, []);

  const isNull = (arg, func) => {
    if (arg === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else func(arg);
  };

  useEffect(() => {
    const fetchAPI = async () => {
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
    fetchAPI();
  }, [searchData]);

  useEffect(() => {
    const fetchCatAPI = async () => {
      console.log(filterCategory);
      const { category, page } = filterCategory;
      if (category !== '') {
        if (page === '/foods') {
          const url = `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
          const results = await fetch(url);
          console.log('results', results);
          const data = await results.json();
          console.log('data', data);
          console.log(data);
          isNull(setMeals, data.meals);
        } else {
          const newData = await fetchFilterDrinkCategories(category);
          isNull(setDrinks, newData);
        }
      }
    };
    fetchCatAPI();
  }, [filterCategory]);

  useEffect(() => {
    const redirectSingleMeal = () => {
      if (meals.length === 1) {
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
