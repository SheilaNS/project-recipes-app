import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import { renderPath } from './helpers';

const befEachCallback = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
  localStorage.clear();
};

const path = '/drinks/178319/in-progress';

describe('Página de detalhes de uma receita - renderização de cards e botões', () => {
  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());

  it('A tela de comida possui todos os atributos',
    async () => {
      renderPath(path);
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
      const ingredientStep = await screen.findByTestId('0-ingredient-step');
      expect(ingredientStep).toBeInTheDocument();
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    });
  it('Verifica se os elementos do protótipo existem na tela', async () => {
    renderPath(path);
    const recipeImg = await screen.findByTestId('recipe-photo');
    expect(recipeImg.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle.innerHTML).toBe('Aquamarine');
  });
});

describe('Página de detalhes de receitas - clique em botões', () => {
  const favoriteRecipes = [{
    id: '178319',
    type: 'drink',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    nationality: '',
  }];

  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());
  it('Verifica se o clique no botão finish leva para a página correta', async () => {
    const { history } = renderPath(path);
    const checkboxes = await screen.findAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    userEvent.click(finishBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Verifica se o clique no botão Share copia link da receita', async () => {
    renderPath(path);
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
    expect(global.navigator.clipboard.writeText)
      .toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
  });
  it('Verifica o clique no botão de Favorito', async () => {
    renderPath(path);
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    const newFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(newFav).toEqual(favoriteRecipes);
  });
});
