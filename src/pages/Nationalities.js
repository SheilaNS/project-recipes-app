import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import { fetchNationalityFood } from '../services/fetchFoods';
import AppContext from '../context/AppContext';

function Nationalities() {
  const { meals } = useContext(AppContext);
  const [nationalityData, setNationalityData] = useState([]);

  useEffect(() => {
    const fetchNationality = async () => {
      const data = await fetchNationalityFood();
      setNationalityData(data.meals);
    };
    fetchNationality();
  });

  return (
    <>
      <Header title="Explore Nationalities" searchOn />
      <select data-testid="explore-by-nationality-dropdown">
        <option>All</option>
        {nationalityData
          .reduce((acc, { strArea }) => {
            if (!acc.includes(strArea)) acc = [...acc, strArea];
            return acc;
          }, [])
          .map((nationality, index) => (
            <option data-testid={ `${nationality}-option` } key={ index }>
              {nationality}
            </option>))}
      </select>
      {meals.length && (
        meals.reduce((acc, curr, index) => {
          const maxCards = 12;
          if (index < maxCards) acc = [...acc, curr];
          return acc;
        }, [])
          .map(({ strMeal, strMealThumb, idMeal }, index) => (
            <Link
              key={ index }
              to={ `/foods/${idMeal}` }
            >
              <Cards
                recipe={ { recipeName: strMeal, recipeImg: strMealThumb, index } }
              />
            </Link>
          ))
      )}
      <Footer />
    </>
  );
}

export default Nationalities;
