import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import { renderPath } from './helpers';

const befEachCallback = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
  localStorage.clear();
};

const path = '/foods/52771/in-progress';

describe('Recipe in progress page - card and button rendering', () => {
  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());

  it('The food screen has all the attributes',
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
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    });
  it('Checks if prototype elements exist on the screen', async () => {
    renderPath(path);
    const recipeImg = await screen.findByTestId('recipe-photo');
    expect(recipeImg.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle.innerHTML).toBe('Spicy Arrabiata Penne');
  });
});

describe('Recipe in progress page - buttons', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
  ];

  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());
  it('Checks that clicking the finish button takes you to the correct page', async () => {
    const { history } = renderPath(path);
    const checkboxes = await screen.findAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    userEvent.click(finishBtn);
    expect(history.location.pathname).toBe('/done-recipes');
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
      .toHaveBeenCalledWith('http://localhost:3000/foods/52771');
  });
  it('Check the click on the Favorite button', async () => {
    renderPath(path);
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    const newFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(newFav).toEqual(favoriteRecipes);
  });
});
