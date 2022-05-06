const urlGenerator = ({ filter, value }) => {
  if (filter === 'ingredient') return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
  if (filter === 'name') return `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  if (filter === 'letter') return `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
  return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
};

export const fetchMeals = async (inputValues) => {
  const results = await fetch(urlGenerator(inputValues));
  const data = await results.json();
  return data.meals;
};

export const fetchFoodCat = async () => {
  const results = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await results.json();
  return data.meals;
};

export const fetchFoodByCat = async (value) => {
  const results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
  const data = await results.json();
  return data.meals;
};

export const fetchFoodDetails = async (id) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const results = await fetch(URL);
  const data = await results.json();
  return data.meals[0];
};

export const fetchNationalityFood = async () => {
  try {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchIngredientsList = async () => {
  const results = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const data = await results.json();
  return data.meals;
};
