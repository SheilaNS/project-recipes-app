import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import fetchRequest from '../../../cypress/mocks/fetch';
import { meals } from '../../../cypress/mocks/meals';
import App from '../../App';
import AppProvider from '../../context/AppProvider';

export const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <AppProvider>
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
