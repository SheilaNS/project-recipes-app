import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderPath } from './helpers';

describe('Profile', () => {
  beforeEach(async () => {
    localStorage.setItem('user', '{ "email": "email@mail.com" }');
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('doneRecipes', '[]');
    localStorage.setItem('favoriteRecipes', '[]');
    localStorage.setItem('inProgressRecipes', '{}');
  });
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('Checks if elements appear on the Profile screen', () => {
    renderPath('/profile');

    const email = screen.getByTestId('profile-email');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(email).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('Checks if the localStorage is cleared when clicking the Logout button', () => {
    renderPath('/profile');

    expect(localStorage.getItem('user')).toBe('{ "email": "email@mail.com" }');
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
    expect(localStorage.getItem('doneRecipes')).toBe('[]');
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
    expect(localStorage.getItem('inProgressRecipes')).toBe('{}');

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('mealsToken')).toBeNull();
    expect(localStorage.getItem('cocktailsToken')).toBeNull();
    expect(localStorage.getItem('doneRecipes')).toBeNull();
    expect(localStorage.getItem('favoriteRecipes')).toBeNull();
    expect(localStorage.getItem('inProgressRecipes')).toBeNull();
  });
});

describe('Changes the screen:', () => {
  it('By clicking the Done Recipes button', () => {
    const { history } = renderPath('/profile');

    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('By clicking the Favorite Recipes button', () => {
    const { history } = renderPath('/profile');

    const favBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favBtn);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
