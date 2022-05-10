import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import fetchRequest from '../../cypress/mocks/fetch';
import { drinkCategories, filteredDrinks, renderPath } from './helpers';

const maxCards = 12;

const checkFirstTwelveRecipes = async (recipes, category) => {
  const categoryBtn = await screen.findByTestId(`${category}-category-filter`);
  userEvent.click(categoryBtn);
  expect(global.fetch).toHaveBeenCalled();

  recipes.slice(0, maxCards).forEach((recipe, index) => {
    const recipeCard = screen.getByTestId(`${index}-recipe-card`);
    expect(recipeCard).toBeInTheDocument();

    const cardImg = screen.getByTestId(`${index}-card-img`);
    expect(cardImg).toBeInTheDocument();

    const cardName = screen.getByTestId(`${index}-card-name`);
    expect(cardName).toBeInTheDocument();
  });

  const card13 = await screen.findByTestId('12-recipe-card');
  expect(card13).not.toBeInTheDocument();
  const cardImg13 = await screen.findByTestId('12-card-img');
  expect(cardImg13).not.toBeInTheDocument();
  const cardName13 = await screen.findByTestId('12-card-name');
  expect(cardName13).not.toBeInTheDocument();
};

const foreachCallback = async ({ strCategory }) => {
  const categoryBtn = await screen.findByTestId(`${strCategory}-category-filter`);
  expect(categoryBtn).toBeInTheDocument();
};

const path = '/drinks';

const beforeEachCallback = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
};

describe('Drink Recipes Page - Card and Button Rendering', () => {
  beforeEach(beforeEachCallback);
  afterEach(() => jest.clearAllMocks());
  it('When navigating to /drinks route, the filter buttons are present',
    async () => {
      renderPath(path);
      expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
      drinkCategories.drinks.forEach(foreachCallback);
      expect(global.fetch).toHaveBeenCalled();
    });
  it('When navigating to /drinks route, the recipe cards are present',
    async () => {
      renderPath(path);
      filteredDrinks.forEach(foreachCallback);
    });
});

describe('Drink Recipes Page - Buttons', () => {
  beforeEach(beforeEachCallback);
  afterEach(() => jest.clearAllMocks());
  it('Clicking the "Cocktail" button renders the filtered recipes',
    async () => {
      renderPath(path);
      checkFirstTwelveRecipes(cocktailDrinks.drinks, 'Cocktail');
    });
  it('Clicking the "All" button renders all recipes',
    async () => {
      renderPath(path);
      const allBtn = screen.getByTestId('All-category-filter');
      userEvent.click(allBtn);

      filteredDrinks.forEach(foreachCallback);
    });
});
