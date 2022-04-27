import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return { ...resources, history };
};

const EMAIL_INPUT = screen.getByTestId('email-input');
const PASSWORD_INPUT = screen.getByTestId('password-input');
const LOGIN_SUBMIT_BTN = screen.getByTestId('login-submit-btn');
const DEF_EMAIL = 'user@user.com';
const userActions = () => {
  userEvent.type(EMAIL_INPUT, DEF_EMAIL);
  userEvent.type(PASSWORD_INPUT, 'Password');
  userEvent.click(LOGIN_SUBMIT_BTN);
};

describe('2 - Crie um formulário para identificação', () => {
  beforeEach(() => {
    localStorage.clear();
    renderPath('/');
  });
  it('Ao navegar para a rota /, os inputs e o botão especificados estão presentes',
    () => {
      expect(EMAIL_INPUT).toBeInTheDocument();
      expect(PASSWORD_INPUT).toBeInTheDocument();
      expect(LOGIN_SUBMIT_BTN).toBeInTheDocument();
    });
  it('O botão só é habilitado se e-mail e senha forem válidos',
    () => {
      expect(EMAIL_INPUT.value).toBe('');
      expect(PASSWORD_INPUT.value).toBe('');
      expect(LOGIN_SUBMIT_BTN).toBeDisabled();

      userEvent.type(PASSWORD_INPUT, 'Pass');
      expect(PASSWORD_INPUT.value).toBe('Pass');
      expect(LOGIN_SUBMIT_BTN).toBeDisabled();

      userEvent.type(EMAIL_INPUT, 'user');
      expect(EMAIL_INPUT.value).toBe('user');
      expect(LOGIN_SUBMIT_BTN).toBeDisabled();

      userEvent.type(PASSWORD_INPUT, 'word');
      expect(PASSWORD_INPUT.value).toBe('Password');
      expect(LOGIN_SUBMIT_BTN).toBeDisabled();

      userEvent.type(EMAIL_INPUT, '@user.com');
      expect(EMAIL_INPUT.value).toBe(DEF_EMAIL);
      expect(LOGIN_SUBMIT_BTN).toBeEnabled();
    });
  it(
    'Ao clicar no botão habilitado, tokens e e-mail são salvos no localStorage',
    () => {
      userActions();
      const storedEmail = JSON.parse(localStorage.getItem('user')).email;
      expect(storedEmail).toBe(DEF_EMAIL);
      const storedMealsToken = JSON.parse(localStorage.getItem('mealsToken'));
      expect(storedMealsToken).toBe('1');
      const storedDrinksToken = JSON.parse(localStorage.getItem('cocktailsToken'));
      expect(storedDrinksToken).toBe('1');
    },
  );
  it('Será validado se ao clicar no botão acontece o redirecionamento para a rota /foods',
    () => {
      userActions();
      expect(window.location.pathname).toBe('/foods');
    });
});
