import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
// import { useHistory } from 'react-router-dom';

function Search() {
  // const history = useHistory();
  const location = useLocation();
  const [searchInputData, setSearchInputData] = useState({
    filter: '', value: '', page: location.pathname,
  });
  const { setSearchData } = useContext(AppContext);

  const handleChange = ({ target: { name, value } }) => {
    if (name) setSearchInputData({ ...searchInputData, value });
    else setSearchInputData({ ...searchInputData, filter: value });
  };

  const handleClick = () => {
    if (searchInputData.filter === 'letter' && searchInputData.value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      setSearchData(searchInputData);
    }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        placeholder="Search"
        value={ searchInputData.value }
        onChange={ handleChange }
        name="search-input"
      />
      <div>
        <label htmlFor="ingredient-radio">
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-radio"
            value="ingredient"
            onChange={ handleChange }
            checked={ searchInputData.filter === 'ingredient' }
          />
        </label>
        <label htmlFor="name-radio">
          Name
          <input
            type="radio"
            id="name-radio"
            value="name"
            data-testid="name-search-radio"
            onChange={ handleChange }
            checked={ searchInputData.filter === 'name' }
          />
        </label>
        <label htmlFor="first-letter">
          First letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter"
            value="letter"
            onChange={ handleChange }
            checked={ searchInputData.filter === 'letter' }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

export default Search;
