import { act, screen } from '@testing-library/react';
import fetchRequest from '../../cypress/mocks/fetch';
import { renderPath } from './helpers';

const befEachCallback = async () => {
  await act(async () => {
    renderPath('/foods/52771');
  });
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
};

describe('Página de detalhes de uma receita - renderização de cards e botões', () => {
  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());

  it('A tela de comida possui todos os atributos',
    async () => {
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      expect(screen.getByTestId('video')).toBeInTheDocument();
      expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
      const ingredientName = await screen.findByTestId('0-ingredient-name-and-measure');
      expect(ingredientName).toBeInTheDocument();
      const recomCard = await screen.findByTestId('0-recomendation-card');
      expect(ingredientName).toBeInTheDocument();
      expect(recomCard).toBeInTheDocument();
    });
  // it('Ao navegar para a rota /foods, os cards de receita estão presentes',
  //   async () => {
  //     filteredMeals.forEach(foreachCallback);
  //   });
});

// describe('Página de receitas principal - clique em botões', () => {
//   beforeEach(befEachCallback);
//   afterEach(() => jest.clearAllMocks());

//   it('Ao clicar no botão "Beef", renderiza as receitas filtradas ',
//     async () => {
//       checkFirstTwelveRecipes(beefMeals.meals, 'Beef');
//     });
//   it('Ao clicar no botão "Breakfest", renderiza as receitas filtradas ',
//     async () => {
//       checkFirstTwelveRecipes(breakfastMeals.meals, 'Breakfest');
//     });
//   it('Ao clicar no botão "Chicken", renderiza as receitas filtradas ',
//     async () => {
//       checkFirstTwelveRecipes(chickenMeals.meals, 'Chicken');
//     });
//   it('Ao clicar no botão "Dessert", renderiza as receitas filtradas ',
//     async () => {
//       checkFirstTwelveRecipes(dessertMeals.meals, 'Dessert');
//     });
//   it('Ao clicar no botão "Goat", renderiza as receitas filtradas ',
//     async () => {
//       checkFirstTwelveRecipes(goatMeals.meals, 'Goat');
//     });
//   it('Ao clicar no botão "Soup", renderiza as receitas filtradas ',
//     async () => {
//       checkFirstTwelveRecipes(soupMeals.meals, 'Soup');
//     });
//   it('Ao clicar no botão "All", renderiza as todas receitas ',
//     async () => {
//       const allBtn = screen.getByTestId('All-category-filter');
//       userEvent.click(allBtn);

//       filteredMeals.forEach(foreachCallback);
//     });
// });
