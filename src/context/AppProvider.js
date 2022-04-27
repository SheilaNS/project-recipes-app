import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchDrinks from '../services/fetchDrinks';
import fetchMeals from '../services/fetchFoods';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [searchData, setSearchData] = useState({ filter: '', value: '', page: '' });
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchAPI = async () => {
      const newMeals = await fetchMeals(searchData);
      setMeals(newMeals);
      const newDrinks = await fetchDrinks(searchData);
      setDrinks(newDrinks);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
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
    fetchAPI();
  }, [searchData]);

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
