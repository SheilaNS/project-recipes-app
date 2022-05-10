import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import fetchRequest from '../../cypress/mocks/fetch';
import { renderPath } from './helpers';

const maxIngredients = 12;

const checkFirstTwelveIng = async () => {
  expect(global.fetch).toHaveBeenCalled();

  drinkIngredients.drinks.slice(0, maxIngredients)
    .forEach(({ strIngredient1 }, index) => {
      const recipeCard = screen.getByTestId(`${index}-ingredient-card`);
      expect(recipeCard).toBeInTheDocument();

      const cardImg = screen.getByTestId(`${index}-card-img`);
      expect(cardImg).toBeInTheDocument();

      const cardName = screen.getByTestId(`${index}-card-name`);
      expect(cardName).toBeInTheDocument();
      expect(cardName.innerHTML).toBe(strIngredient1);
    });

  const card13 = await screen.findByTestId('12-ingredient-card');
  expect(card13).not.toBeInTheDocument();
  const cardImg13 = await screen.findByTestId('12-card-img');
  expect(cardImg13).not.toBeInTheDocument();
  const cardName13 = await screen.findByTestId('12-card-name');
  expect(cardName13).not.toBeInTheDocument();
};

const path = '/explore/drinks/ingredients';

const befEachCallback = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
};

describe('Página de explorar por ingredientes - renderização de cards e botões', () => {
  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());

  it('Ao navegar para rota /drinks/ingredients, os cards de ingrediente estão presentes',
    async () => {
      renderPath(path);
      const pageTitle = await screen.findByTestId('page-title');
      expect(pageTitle).toBeInTheDocument();
      checkFirstTwelveIng();
    });
  it('Ao clicar no card, redireciona para a página /drinks',
    async () => {
      const { history } = renderPath(path);
      const recipeCard = await screen.findByTestId('0-ingredient-card');
      userEvent.click(recipeCard);
      expect(history.location.pathname).toBe('/drinks');
    });
});
