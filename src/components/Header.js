import React from 'react';

function Header() {
  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        Profile
      </button>
      <h1 data-testid="page-title">Foods</h1>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        Search
      </button>
    </header>
  );
}

export default Header;
