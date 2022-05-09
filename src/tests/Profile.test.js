import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderPath } from './helpers';

describe('Tela de Profile', () => {
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

  it('Verifica se os elementos aparecem na tela de Profile', () => {
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

  it('Verifica se o localStorage é limpo ao clicar no botão de Logout', () => {
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

describe('Muda a tela:', () => {
  it('Ao clicar no botão Done Recipes', () => {
    const { history } = renderPath('/profile');

    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Ao clicar no botão Done Recipes', () => {
    const { history } = renderPath('/profile');

    const favBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favBtn);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
