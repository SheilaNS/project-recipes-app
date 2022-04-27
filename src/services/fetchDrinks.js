const urlGenerator = ({ filter, value }) => {
  if (filter === 'ingredient') {
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
  }
  if (filter === 'name') {
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
  }
  if (filter === 'letter') {
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
  }
  return 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
};

const fetchDrinks = async (inputValues) => {
  const results = await fetch(urlGenerator(inputValues));
  const data = await results.json();
  return data.drinks;
};

export default fetchDrinks;
