import React from 'react';
// import { useHistory } from 'react-router-dom';

function Search() {
  // const history = useHistory();

  return (
    <div>
      <input data-testid="search-input" />
      <input type="radio" data-testid="ingredient-search-radio" />
      <input type="radio" data-testid="name-search-radio" />
      <input type="radio" data-testid="first-letter-search-radio" />
      <button type="button" data-testid="exec-search-btn">
        Search
      </button>
    </div>
  );
}

export default Search;
