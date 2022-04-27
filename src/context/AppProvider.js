import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchDrinks from '../services/fetchDrinks';
import fetchMeals from '../services/fetchFoods';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [searchData, setSearchData] = useState({});
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const { filter, value } = searchData;
      if (searchData.page === '/foods') {
        const newData = await fetchMeals({ filter, value });
        setMeals(newData);
      } else {
        const newData = await fetchDrinks({ filter, value });
        setDrinks(newData);
      }
    };
    fetchAPI();
  }, [searchData]);

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
