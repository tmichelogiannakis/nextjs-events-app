import { render, screen } from '@testing-library/react';
import IndexPage from '../../src/pages/index';
import { ThemeWrapper } from '../utils';

describe('IndexPage', () => {
  it('renders without crashing', () => {
    render(<IndexPage />, { wrapper: ThemeWrapper });
    expect(
      screen.getByRole('heading', { name: 'The Home Page' })
    ).toBeInTheDocument();
  });
});
