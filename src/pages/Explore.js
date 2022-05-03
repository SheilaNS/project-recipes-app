import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();

  const handleClickExploreFoods = () => {
    history.push('/explore/foods');
  };

  const handleClickExploreDrinks = () => {
    history.push('/explore/drinks');
  };

  return (
    <>
      <Header title="Explore" searchOn={ false } />
      <main>
        <button
          data-testid="explore-foods"
          type="button"
          onClick={ handleClickExploreFoods }
        >
          Explore Foods
        </button>

        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ handleClickExploreDrinks }
        >
          Explore Drinks
        </button>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
