import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import beefMeals from '../../cypress/mocks/beefMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import dessertMeals from '../../cypress/mocks/dessertMeals';
import fetchRequest from '../../cypress/mocks/fetch';
import goatMeals from '../../cypress/mocks/goatMeals';
import mealCategories from '../../cypress/mocks/mealCategories';
import soupMeals from '../../cypress/mocks/soupMeals';
import { filteredMeals, renderPath } from './helpers';

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

const path = '/foods';

const befEachCallback = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
};

describe('Página de receitas principal - renderização de cards e botões', () => {
  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());

  it('Ao navegar para a rota /foods, os botões de filtro estão presentes',
    async () => {
      renderPath(path);
      expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
      mealCategories.meals.forEach(foreachCallback);
      expect(global.fetch).toHaveBeenCalled();
    });
  it('Ao navegar para a rota /foods, os cards de receita estão presentes',
    async () => {
      renderPath(path);
      filteredMeals.forEach(foreachCallback);
    });
});

describe('Página de receitas principal - clique em botões', () => {
  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());

  it('Ao clicar no botão "Beef", renderiza as receitas filtradas ',
    async () => {
      renderPath(path);
      checkFirstTwelveRecipes(beefMeals.meals, 'Beef');
    });
  it('Ao clicar no botão "Breakfest", renderiza as receitas filtradas ',
    async () => {
      renderPath(path);
      checkFirstTwelveRecipes(breakfastMeals.meals, 'Breakfest');
    });
  it('Ao clicar no botão "Chicken", renderiza as receitas filtradas ',
    async () => {
      renderPath(path);
      checkFirstTwelveRecipes(chickenMeals.meals, 'Chicken');
    });
  it('Ao clicar no botão "Dessert", renderiza as receitas filtradas ',
    async () => {
      renderPath(path);
      checkFirstTwelveRecipes(dessertMeals.meals, 'Dessert');
    });
  it('Ao clicar no botão "Goat", renderiza as receitas filtradas ',
    async () => {
      renderPath(path);
      checkFirstTwelveRecipes(goatMeals.meals, 'Goat');
    });
  it('Ao clicar no botão "Soup", renderiza as receitas filtradas ',
    async () => {
      renderPath(path);
      checkFirstTwelveRecipes(soupMeals.meals, 'Soup');
    });
  it('Ao clicar no botão "All", renderiza as todas receitas ',
    async () => {
      renderPath(path);
      const allBtn = screen.getByTestId('All-category-filter');
      userEvent.click(allBtn);

      filteredMeals.forEach(foreachCallback);
    });
});
