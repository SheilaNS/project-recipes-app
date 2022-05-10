import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import { renderPath } from './helpers';

const maxIngredients = 12;

const checkFirstTwelveIng = async () => {
  expect(global.fetch).toHaveBeenCalled();

  mealIngredients.meals.slice(0, maxIngredients).forEach(({ strIngredient }, index) => {
    const recipeCard = screen.getByTestId(`${index}-ingredient-card`);
    expect(recipeCard).toBeInTheDocument();

    const cardImg = screen.getByTestId(`${index}-card-img`);
    expect(cardImg).toBeInTheDocument();

    const cardName = screen.getByTestId(`${index}-card-name`);
    expect(cardName).toBeInTheDocument();
    expect(cardName.innerHTML).toBe(strIngredient);
  });

  const card13 = await screen.findByTestId('12-ingredient-card');
  expect(card13).not.toBeInTheDocument();
  const cardImg13 = await screen.findByTestId('12-card-img');
  expect(cardImg13).not.toBeInTheDocument();
  const cardName13 = await screen.findByTestId('12-card-name');
  expect(cardName13).not.toBeInTheDocument();
};

const path = '/explore/foods/ingredients';

const befEachCallback = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
};

describe('Explore by ingredients page - card and button rendering', () => {
  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());

  it('When navigating to /foods/ingredients route, all ingredient cards are present',
    async () => {
      renderPath(path);
      const pageTitle = await screen.findByTestId('page-title');
      expect(pageTitle).toBeInTheDocument();
      checkFirstTwelveIng();
    });
  it('When clicking on the card, it redirects to the /foods page',
    async () => {
      const { history } = renderPath(path);
      const recipeCard = await screen.findByTestId('0-ingredient-card');
      userEvent.click(recipeCard);
      expect(history.location.pathname).toBe('/foods');
    });
});
