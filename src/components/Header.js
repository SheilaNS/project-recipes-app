import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';

function Header({ title, searchOn }) {
  const history = useHistory();
  const [renderSearch, setRenderSearch] = useState(false);

  const handleProfileClick = () => history.push('/profile');
  const handleSearchClick = () => setRenderSearch(!renderSearch);

  return (
    <>
      <header>
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ handleProfileClick }
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
            onClick={ handleSearchClick }
          >
            <img
              src={ searchIcon }
              alt="Search Icon"
            />
          </button>)}
      </header>
      { renderSearch && (
        <Search />)}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchOn: PropTypes.bool,
}.isRequired;

export default Header;
