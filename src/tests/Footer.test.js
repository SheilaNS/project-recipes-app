import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderPath } from './helpers';

describe('Footer', () => {
  beforeEach(() => {
    localStorage.clear();
    renderPath('/foods');
  });
  it('When navigating to the /foods route, the footer and specified buttons are present',
    () => {
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
      expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
      expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    });
  it('Redirects to a cocktail list when clicking on the drinks icon',
    () => {
      userEvent.click(screen.getByTestId('drinks-bottom-btn'));
      expect(window.location.pathname).toBe('/drinks');
    });
  it('Redirects to explore screen when clicking explore icon',
    () => {
      userEvent.click(screen.getByTestId('explore-bottom-btn'));
      expect(window.location.pathname).toBe('/explore');
    });
  it('Redirects to a cocktail list when clicking on the drinks icon',
    () => {
      userEvent.click(screen.getByTestId('food-bottom-btn'));
      expect(window.location.pathname).toBe('/foods');
    });
});
