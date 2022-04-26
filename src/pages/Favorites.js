import React from 'react';
import Header from '../components/Header';

function Favorites() {
  return (
    <>
      <Header title="Favorite Recipes" searchOn={ false } />
      <h1>
        Favorites
      </h1>
    </>
  );
}

export default Favorites;
