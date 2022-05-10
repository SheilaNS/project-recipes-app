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

describe('Página de explorar', () => {
  beforeEach(befEachCallback);
  afterEach(() => jest.clearAllMocks());

  it('A tela de explorar possui todos os atributos',
    async () => {
      renderPath(path);
      expect(screen.getByTestId('explore-foods')).toBeInTheDocument();
      expect(screen.getByTestId('explore-drinks')).toBeInTheDocument();
    });
  it('Verifica se o clique no botão de Foods direciona para a tela correta', async () => {
    const { history } = renderPath(path);
    userEvent.click(screen.getByTestId('explore-foods'));
    expect(history.location.pathname).toBe('/explore/foods');
  });
  it('Verifica se o clique no botão de Drinks direciona para tela correta', async () => {
    const { history } = renderPath(path);
    userEvent.click(screen.getByTestId('explore-drinks'));
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
