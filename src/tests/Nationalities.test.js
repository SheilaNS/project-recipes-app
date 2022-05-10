import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import japaneseMeals from '../../cypress/mocks/japaneseMeals';
import meals from '../../cypress/mocks/meals';
import { renderPath } from './helpers';

const page = '/explore/foods/nationalities';

const getNationalities = (area) => {
  const areas = area.meals.reduce((acc, { strArea }) => {
    if (!acc.includes(strArea)) acc = [...acc, strArea];
    return acc;
  }, []);
  return areas;
};

describe('Explore Nationalities screen', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => jest.clearAllMocks());
  it('Checks if 12 cards appear on the screen', () => {
    renderPath(page);

    const title = screen.getByRole('heading',
      { name: 'Explore Nationalities', level: 1 });
    expect(title).toBeInTheDocument();
  });

  it('Checks whether the specified elements appear on the screen', async () => {
    renderPath(page);

    const dropdownInput = screen.getByTestId('explore-by-nationality-dropdown');
    expect(dropdownInput).toBeInTheDocument();

    const optionList = getNationalities(meals);
    optionList.forEach(async (option) => {
      const optionTag = await screen.findByTestId(`${option}-option`);
      expect(optionTag).toBeInTheDocument();
    });
  });
});

describe('It shows on the screen the recipes of the required nationalities', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation((url) => fetchRequest(url));
  });

  it('Japanese', async () => {
    renderPath(page);

    const dropdownInput = await screen.findByTestId('explore-by-nationality-dropdown');
    userEvent.selectOptions(dropdownInput, ['Japanese']);
    const japaneseOpt = await screen.findByTestId('Japanese-option');
    expect(japaneseOpt.selected).toBe(true);

    japaneseMeals.meals.forEach(async (_recipe, index) => {
      const maxCard = 12;
      if (index < maxCard) {
        const recipes = await screen.findByTestId(`${index}-card-name`);
        expect(recipes).toBeInTheDocument();
      }
    });
  });
});
