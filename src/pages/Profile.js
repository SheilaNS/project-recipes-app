import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [email, setEmail] = useState('email@email.com');

  const history = useHistory();

  useEffect(() => {
    if (user) {
      const userEmail = user.email;
      setEmail(userEmail);
    }
  }, []);

  const handleClickFavorite = () => {
    history.push('/favorite-recipes');
  };

  const handleClickDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" searchOn={ false } />
      <main>
        <p data-testid="profile-email">{email}</p>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ handleClickDoneRecipes }
        >
          Done Recipes
        </button>

        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ handleClickFavorite }
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleClickLogout }
        >
          Logout
        </button>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
