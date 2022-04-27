import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEF_EMAIL, EMAIL_INPUT, LOGIN_BTN, PASSWORD_INPUT, renderPath } from './helpers';

const userActions = () => {
  userEvent.type(screen.getByTestId(EMAIL_INPUT), DEF_EMAIL);
  userEvent.type(screen.getByTestId(PASSWORD_INPUT), 'Password');
  userEvent.click(screen.getByTestId(LOGIN_BTN));
};

describe('Tela de Login', () => {
  beforeEach(() => {
    localStorage.clear();
    renderPath('/');
  });
  it('Ao navegar para a rota /, os inputs e o botão especificados estão presentes',
    () => {
      expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
      expect(screen.getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
      expect(screen.getByTestId(LOGIN_BTN)).toBeInTheDocument();
    });
  it('O botão só é habilitado se e-mail e senha forem válidos',
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
    'Ao clicar no botão habilitado, tokens e e-mail são salvos no localStorage',
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
  it('Será validado se ao clicar no botão acontece o redirecionamento para a rota /foods',
    () => {
      userActions();
      expect(window.location.pathname).toBe('/foods');
    });
});
