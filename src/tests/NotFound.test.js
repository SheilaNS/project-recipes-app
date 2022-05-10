import { screen } from '@testing-library/react';
import { renderPath } from './helpers';

describe('Tela de Page Not Found', () => {
  it('', () => {
    renderPath('/comida');

    const title = screen.getByRole('heading', { name: 'Page Not Found', level: 1 });
    expect(title).toBeInTheDocument();
  });
});
