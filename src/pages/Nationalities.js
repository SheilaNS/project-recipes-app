import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import { fetchByNationality, fetchNationalities } from '../services/fetchFoods';

function Nationalities() {
  const { meals } = useContext(AppContext);
  const maxCards = 12;

  const reducedMeals = meals.reduce((acc, curr, index) => {
    if (index < maxCards) acc = [...acc, curr];
    return acc;
  }, []);
  const [nationalityData, setNationalityData] = useState([]);
  const [nationalityEvent, setNationalityEvent] = useState('');
  const [nationalityMeals, setNationalityMeals] = useState(reducedMeals);

  useEffect(() => {
    const fetchNationality = async () => {
      const data = await fetchNationalities();
      setNationalityData(data.meals);
    };
    fetchNationality();
  });

  useEffect(() => {
    setNationalityMeals(reducedMeals);
  }, []);

  useEffect(() => {
    const fetchNatMeals = async () => {
      const data = await fetchByNationality(nationalityEvent);
      if (data.length) {
        const newMeals = data.filter((_element, index) => index < maxCards);
        setNationalityMeals(newMeals);
      }
    };
    fetchNatMeals();
  }, [nationalityEvent]);

  const handleChange = ({ target: { value } }) => {
    if (value === '') setNationalityMeals(reducedMeals);
    setNationalityEvent(value);
  };

  return (
    <>
      <Header title="Explore Nationalities" searchOn />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleChange }
      >
        <option
          value=""
          data-testid="All-option"
        >
          All

        </option>
        {nationalityData
          .reduce((acc, { strArea }) => {
            if (!acc.includes(strArea)) acc = [...acc, strArea];
            return acc;
          }, [])
          .map((nationality, index) => (
            <option
              data-testid={ `${nationality}-option` }
              key={ index }
            >
              {nationality}
            </option>))}
      </select>
      {(nationalityMeals.length > 0
        ? nationalityMeals
        : reducedMeals)
        .map(({ strMeal, strMealThumb, idMeal }, index) => (
          <Link
            key={ index }
            to={ `/foods/${idMeal}` }
          >
            <Cards
              recipe={ { recipeName: strMeal, recipeImg: strMealThumb, index } }
            />
          </Link>
        ))}
      <Footer />
    </>
  );
}

export default Nationalities;
