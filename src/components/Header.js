import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchOn }) {
  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
      >
        <img
          src={ profileIcon }
          alt="Profile Icon"
        />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      { searchOn && (
        <button
          type="button"
          data-testid="search-top-btn"
          src={ searchIcon }
        >
          <img
            src={ searchIcon }
            alt="Search Icon"
          />
        </button>)}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchOn: PropTypes.bool,
}.isRequired;

export default Header;
