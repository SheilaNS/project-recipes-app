import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../../App';
import AppProvider from '../../context/AppProvider';
import fetchRequest from '../../../cypress/mocks/fetch';
import AppContext from '../../context/AppContext';

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
  return { ...resources, history, AppContext };
};

export const EMAIL_INPUT = 'email-input';
export const PASSWORD_INPUT = 'password-input';
export const LOGIN_BTN = 'login-submit-btn';
export const DEF_EMAIL = 'user@user.com';

export const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
};
