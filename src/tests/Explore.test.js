import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchRequest from '../../cypress/mocks/fetch';
import { renderPath } from './helpers';

const befEachCallback = async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => fetchRequest(url));
  localStorage.clear();
};

const path = '/explore';

describe('Explore page', () => {
  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());

  it('The explore screen has all the attributes',
    async () => {
      renderPath(path);
      expect(screen.getByTestId('explore-foods')).toBeInTheDocument();
      expect(screen.getByTestId('explore-drinks')).toBeInTheDocument();
    });
  it('Checks if clicking on the Foods button renders the correct screen', async () => {
    const { history } = renderPath(path);
    userEvent.click(screen.getByTestId('explore-foods'));
    expect(history.location.pathname).toBe('/explore/foods');
  });
  it('Checks if clicking on the Drinks button renders the correct screen', async () => {
    const { history } = renderPath(path);
    userEvent.click(screen.getByTestId('explore-drinks'));
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
