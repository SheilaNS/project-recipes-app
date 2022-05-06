import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderPath } from './helpers';

describe('Menu Superior', () => {
  beforeEach(() => {
    localStorage.clear();
    renderPath('/foods');
  });
  it('Ao navegar para a rota /foods, o cabeçalho e botões especificados estão presentes',
    () => {
      expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    });
  it('Redireciona para a página de perfil ao clicar no ícone de perfil',
    () => {
      userEvent.click(screen.getByTestId('profile-top-btn'));
      expect(window.location.pathname).toBe('/profile');
    });
  it('Barra de busca não é exibida ao renderizar a página',
    () => {
      const searchInput = screen.queryByTestId('search-input');
      expect(searchInput).toBeNull();
    });
  it('Barra de busca é exibida ao clicar no ícone de busca',
    () => {
      userEvent.click(screen.getByTestId('search-top-btn'));
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });
});
