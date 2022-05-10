import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderPath } from './helpers';

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    renderPath('/foods');
  });
  it('When navigating to the /foods route, the specified header and buttons are present',
    () => {
      expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    });
  it('Redirects to profile page when clicking profile icon',
    () => {
      userEvent.click(screen.getByTestId('profile-top-btn'));
      expect(window.location.pathname).toBe('/profile');
    });
  it('Search bar is not visible when the page is rendered',
    () => {
      const searchInput = screen.queryByTestId('search-input');
      expect(searchInput).toBeNull();
    });
  it('Search bar is displayed when clicking the search icon',
    () => {
      userEvent.click(screen.getByTestId('search-top-btn'));
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });
});
