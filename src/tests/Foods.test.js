import { act, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import beefMeals from '../../cypress/mocks/beefMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import dessertMeals from '../../cypress/mocks/dessertMeals';
import goatMeals from '../../cypress/mocks/goatMeals';
import mealCategories from '../../cypress/mocks/mealCategories';
import soupMeals from '../../cypress/mocks/soupMeals';
import { filteredMeals, mockFetch, renderPath } from './helpers';

const beforeEachCallback = async () => {
  await act(async () => {
    renderPath('/foods');
  });
  mockFetch();
};

const maxCards = 12;

const checkFirstTwelveRecipes = async (recipes) => {
  recipes.slice(0, maxCards).forEach(async (recipe, index) => {
    const recipeCard = await screen.findByTestId(`${index}-recipe-card`);
    expect(recipeCard).toBeInTheDocument();

    const cardImg = await screen.findByTestId(`${index}-card-img`);
    expect(cardImg).toBeInTheDocument();

    const cardName = await screen.findByTestId(`${index}-card-name`);
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

describe('Página de receitas principal - renderização de cards e botões', () => {
  beforeEach(beforeEachCallback);
  afterEach(cleanup);
  it('Ao navegar para a rota /foods, os botões de filtro estão presentes',
    async () => {
      expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
      mealCategories.meals.forEach(foreachCallback);
    });
  it('Ao navegar para a rota /foods, os cards de receita estão presentes',
    async () => {
      filteredMeals.forEach(foreachCallback);
    });
});

describe('Página de receitas principal - clique em botões', () => {
  beforeEach(beforeEachCallback);
  afterEach(cleanup);
  it('Ao clicar no botão "Beef", renderiza as receitas filtradas ',
    async () => {
      const categoryBtn = await screen.findByTestId(`${'Beef'}-category-filter`);
      userEvent.click(categoryBtn);

      await act(async () => {
        mockFetch();
      });

      checkFirstTwelveRecipes(beefMeals.meals);
    });
  it('Ao clicar no botão "Breakfest", renderiza as receitas filtradas ',
    async () => {
      checkFirstTwelveRecipes(breakfastMeals.meals);
    });
  it('Ao clicar no botão "Chicken", renderiza as receitas filtradas ',
    async () => {
      checkFirstTwelveRecipes(chickenMeals.meals);
    });
  it('Ao clicar no botão "Dessert", renderiza as receitas filtradas ',
    async () => {
      checkFirstTwelveRecipes(dessertMeals.meals);
    });
  it('Ao clicar no botão "Goat", renderiza as receitas filtradas ',
    async () => {
      checkFirstTwelveRecipes(goatMeals.meals);
    });
  it('Ao clicar no botão "Soup", renderiza as receitas filtradas ',
    async () => {
      checkFirstTwelveRecipes(soupMeals.meals);
    });
  it('Ao clicar no botão "All", renderiza as todas receitas ',
    async () => {
      const allBtn = screen.getByTestId('All-category-filter');
      userEvent.click(allBtn);

      filteredMeals.forEach(foreachCallback);
    });
});
