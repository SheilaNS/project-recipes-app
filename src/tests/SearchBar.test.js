import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderPath } from './helpers';

describe('Search bar', () => {
  beforeEach(async () => {
    localStorage.clear();
  });
  afterEach(() => jest.clearAllMocks());

  const searchId = 'search-top-btn';

  it('The search button must be present on the Foods page', () => {
    renderPath('/foods');
    const searchBtn = screen.getByTestId(searchId);
    expect(searchBtn).toBeInTheDocument();
  });

  it('When clicking on the search button the specified elements must be present', () => {
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

  it('Checks if an alert appears when putting 2 letters in the letter input', () => {
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
