import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderPath } from './helpers';
// import fetchRequest from '../../cypress/mocks/fetch';

describe('Barra de Busca na tela de Foods', () => {
  beforeEach(async () => {
    localStorage.clear();
  });
  afterEach(() => jest.clearAllMocks());

  const searchId = 'search-top-btn';

  it('O botão de search deve estar presente na página de Foods', () => {
    renderPath('/foods');
    const searchBtn = screen.getByTestId(searchId);
    expect(searchBtn).toBeInTheDocument();
  });

  it('Ao clicar no botão search os elementos especificados devem estar presentes', () => {
    renderPath('/foods');
    const searchBtn = screen.getByTestId(searchId);
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameInput = screen.getByTestId('name-search-radio');
    const fristLetterInput = screen.getByTestId('first-letter-search-radio');
    const excSearchBtn = screen.getByTestId('exec-search-btn');
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(fristLetterInput).toBeInTheDocument();
    expect(excSearchBtn).toBeInTheDocument();
  });

  it('Verifica se aparece um alerta ao colocar 2 letras no input de letras', () => {
    renderPath('/foods');

    window.alert = jest.fn();
    const searchBtn = screen.getByTestId(searchId);
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'aa');
    const fristLetterInput = screen.getByTestId('first-letter-search-radio');
    userEvent.click(fristLetterInput);
    const excSearchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(excSearchBtn);

    expect(window.alert).toBeCalledTimes(1);
  });
});
