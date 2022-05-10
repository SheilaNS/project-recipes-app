import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEF_EMAIL, EMAIL_INPUT, LOGIN_BTN, PASSWORD_INPUT, renderPath } from './helpers';

const userActions = () => {
  userEvent.type(screen.getByTestId(EMAIL_INPUT), DEF_EMAIL);
  userEvent.type(screen.getByTestId(PASSWORD_INPUT), 'Password');
  userEvent.click(screen.getByTestId(LOGIN_BTN));
};

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
    renderPath('/');
  });
  it('When navigating to the / route, the specified inputs and button are present',
    () => {
      expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
      expect(screen.getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
      expect(screen.getByTestId(LOGIN_BTN)).toBeInTheDocument();
    });
  it('The button is only enabled if the email and password are valid',
    () => {
      expect(screen.getByTestId(EMAIL_INPUT).value).toBe('');
      expect(screen.getByTestId(PASSWORD_INPUT).value).toBe('');
      expect(screen.getByTestId(LOGIN_BTN)).toBeDisabled();
      userEvent.type(screen.getByTestId(PASSWORD_INPUT), 'Pass');
      expect(screen.getByTestId(PASSWORD_INPUT).value).toBe('Pass');
      expect(screen.getByTestId(LOGIN_BTN)).toBeDisabled();
      userEvent.type(screen.getByTestId(EMAIL_INPUT), 'user');
      expect(screen.getByTestId(EMAIL_INPUT).value).toBe('user');
      expect(screen.getByTestId(LOGIN_BTN)).toBeDisabled();
      userEvent.type(screen.getByTestId(PASSWORD_INPUT), 'Password');
      expect(screen.getByTestId(PASSWORD_INPUT).value).toBe('Password');
      expect(screen.getByTestId(LOGIN_BTN)).toBeDisabled();
      userEvent.type(screen.getByTestId(EMAIL_INPUT), 'user@user.com');
      expect(screen.getByTestId(EMAIL_INPUT).value).toBe(DEF_EMAIL);
      expect(screen.getByTestId(LOGIN_BTN)).toBeEnabled();
    });
  it(
    'By clicking the enabled button, tokens and email are saved in the localStorage',
    () => {
      userActions();
      const storedEmail = JSON.parse(localStorage.getItem('user')).email;
      expect(storedEmail).toBe(DEF_EMAIL);
      const storedMealsToken = JSON.parse(localStorage.getItem('mealsToken'));
      expect(storedMealsToken).toBe(1);
      const storedDrinksToken = JSON.parse(localStorage.getItem('cocktailsToken'));
      expect(storedDrinksToken).toBe(1);
    },
  );
  it('Validates if clicking on the button it redirects to the /foods route',
    () => {
      userActions();
      expect(window.location.pathname).toBe('/foods');
    });
});
