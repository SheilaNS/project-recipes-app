import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  /* const { email } = JSON.parse(localStorage.getItem('userInfo.email')); */
  return (
    <>
      <Header title="Profile" searchOn={ false } />
      a
      <Footer />
      <main>
        <p data-testid="profile-email">email</p>
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
        >
          Logout
        </button>
      </main>
    </>
  );
}

export default Profile;
