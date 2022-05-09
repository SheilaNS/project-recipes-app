import { act, screen } from '@testing-library/react';
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

const beforeEachCallback = async () => {
  await act(async () => {
    renderPath('/drinks');
  });
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
};

describe('Página de receitas principal - renderização de cards e botões', () => {
  beforeEach(beforeEachCallback);
  afterEach(() => jest.clearAllMocks());
  it('Ao navegar para a rota /foods, os botões de filtro estão presentes',
    async () => {
      expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
      drinkCategories.drinks.forEach(foreachCallback);
    });
  it('Ao navegar para a rota /foods, os cards de receita estão presentes',
    async () => {
      filteredDrinks.forEach(foreachCallback);
    });
});

describe('Página de receitas principal - clique em botões', () => {
  beforeEach(beforeEachCallback);
  afterEach(() => jest.clearAllMocks());
  it('Ao clicar no botão "Cocktail", renderiza as receitas filtradas ',
    async () => {
      checkFirstTwelveRecipes(cocktailDrinks.drinks, 'Cocktail');
    });
  it('Ao clicar no botão "All", renderiza as todas receitas ',
    async () => {
      const allBtn = screen.getByTestId('All-category-filter');
      userEvent.click(allBtn);

      filteredDrinks.forEach(foreachCallback);
    });
});
