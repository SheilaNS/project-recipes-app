import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderPath } from './helpers';

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const secondImage = '1-horizontal-image';
const secondTopTxt = '1-horizontal-top-text';
const secondName = '1-horizontal-name';
const secondShareBtn = '1-horizontal-share-btn';
const secondDoneDate = '1-horizontal-done-date';

const befEachCallback = async () => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};

const path = '/done-recipes';

describe('Done Recipes page - cards and buttons', () => {
  beforeEach(befEachCallback);
  afterEach(() => localStorage.clear());

  it('The done recipes screen has all the attributes',
    async () => {
      renderPath(path);
      expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
      expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
      expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
      expect(screen.getByTestId('0-Curry-horizontal-tag')).toBeInTheDocument();
      expect(screen.getByTestId(secondImage)).toBeInTheDocument();
      expect(screen.getByTestId(secondTopTxt)).toBeInTheDocument();
      expect(screen.getByTestId(secondName)).toBeInTheDocument();
      expect(screen.getByTestId(secondShareBtn)).toBeInTheDocument();
      expect(screen.getByTestId('1-horizontal-done-date')).toBeInTheDocument();
    });
});

describe('Done Recipes page - buttons', () => {
  beforeEach(befEachCallback);
  afterEach(() => localStorage.clear());

  it('Checks if clicking the Share button copies the recipe link', async () => {
    renderPath(path);
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
    expect(global.navigator.clipboard.writeText)
      .toHaveBeenCalledWith('http://localhost:3000/foods/52771');
  });

  it('Checks the click on filter buttons', async () => {
    renderPath(path);
    userEvent.click(screen.getByTestId('filter-by-food-btn'));
    expect(screen.queryByTestId(secondImage)).not.toBeInTheDocument();
    expect(screen.queryByTestId(secondTopTxt)).not.toBeInTheDocument();
    expect(screen.queryByTestId(secondName)).not.toBeInTheDocument();
    expect(screen.queryByTestId(secondShareBtn)).not.toBeInTheDocument();
    expect(screen.queryByTestId(secondDoneDate)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getByTestId(secondImage)).toBeInTheDocument();
    expect(screen.getByTestId(secondTopTxt)).toBeInTheDocument();
    expect(screen.getByTestId(secondName)).toBeInTheDocument();
    expect(screen.getByTestId(secondShareBtn)).toBeInTheDocument();
    expect(screen.getByTestId(secondDoneDate)).toBeInTheDocument();
  });
});
