import { screen } from '@testing-library/react';
import { renderPath } from './helpers';

describe('Page Not Found Screen', () => {
  it('if an invalid URL is accessed, this page will be rendered', () => {
    renderPath('/foooods');

    const title = screen.getByRole('heading', { name: 'Page Not Found', level: 1 });
    expect(title).toBeInTheDocument();
  });
});
