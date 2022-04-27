import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderPath } from './helpers';

describe('Menu Inferior', () => {
  beforeEach(() => {
    localStorage.clear();
    renderPath('/foods');
  });
  it('Ao navegar para a rota /foods, o rodapé e os botões especificados estão presentes',
    () => {
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
      expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
      expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    });
  it('Redireciona para uma lista de cocktails ao clicar no ícone de bebidas',
    () => {
      userEvent.click(screen.getByTestId('drinks-bottom-btn'));
      expect(window.location.pathname).toBe('/drinks');
    });
  it('Redireciona para a tela de explorar ao clicar no ícone de exploração',
    () => {
      userEvent.click(screen.getByTestId('explore-bottom-btn'));
      expect(window.location.pathname).toBe('/explore');
    });
  it('Redireciona para uma lista de cocktails ao clicar no ícone de bebidas',
    () => {
      userEvent.click(screen.getByTestId('food-bottom-btn'));
      expect(window.location.pathname).toBe('/foods');
    });
});
