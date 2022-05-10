import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import { renderPath } from './helpers';

const befEachCallback = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
  localStorage.clear();
};

const path = '/drinks/178319';

describe('Drink recipe detail page - card and button rendering', () => {
  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());

  it('Drink screen has all attributes',
    async () => {
      renderPath(path);
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
      const ingredientName = await screen.findByTestId('0-ingredient-name-and-measure');
      expect(ingredientName).toBeInTheDocument();
      const recomCard = await screen.findByTestId('0-recomendation-card');
      expect(ingredientName).toBeInTheDocument();
      expect(recomCard).toBeInTheDocument();
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    });
  it('Checks if all prototype elements exist on the screen', async () => {
    renderPath('/drinks/178319');
    const recipeImg = await screen.findByTestId('recipe-photo');
    expect(recipeImg.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle.innerHTML).toBe('Aquamarine');
  });
});

describe('Recipe detail page - buttons', () => {
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
  it('Checks that clicking the start button takes you to the correct page', async () => {
    const { history } = renderPath(path);
    const startBtn = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });
  it('Checks if clicking the Share button copies the recipe link', async () => {
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
  it('Checks the click on the Favorite button', async () => {
    renderPath(path);
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    const newFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(newFav).toEqual(favoriteRecipes);
  });
  it('Checks if the Start button is not visible if the recipe is done', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderPath(path);
    const favoriteBtn = screen.queryByTestId('search-btn');
    expect(favoriteBtn).not.toBeInTheDocument();
  });
});
