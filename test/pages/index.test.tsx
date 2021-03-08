import { render } from '@testing-library/react';
import IndexPage from '../../src/pages/index';
import { ThemeWrapper } from '../utils';

describe('IndexPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<IndexPage />, { wrapper: ThemeWrapper });
    expect(container).toBeTruthy();
  });
});
