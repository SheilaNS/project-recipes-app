import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { drinks } from '../../../cypress/mocks/drinks';
import fetchRequest from '../../../cypress/mocks/fetch';
import { meals } from '../../../cypress/mocks/meals';
import App from '../../App';
import AppContext from '../../context/AppContext';
import AppProvider from '../../context/AppProvider';

export const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <AppProvider value={ AppContext }>
      <Router history={ history }>
        <App />
      </Router>
    </AppProvider>,
  );
  return { ...resources, history };
};

export const EMAIL_INPUT = 'email-input';
export const PASSWORD_INPUT = 'password-input';
export const LOGIN_BTN = 'login-submit-btn';
export const DEF_EMAIL = 'user@user.com';

export const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
};

const maxRec = 12;

export const filteredMeals = meals.filter((_element, index) => index < maxRec);

export const filteredDrinks = drinks.filter((_element, index) => index < maxRec);

export const drinkCategories = {
  drinks: [
    { strCategory: 'Ordinary Drink' },
    { strCategory: 'Cocktail' },
    { strCategory: 'Shake' },
    { strCategory: 'Other/Unknown' },
    { strCategory: 'Cocoa' },
  ],
};
