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
