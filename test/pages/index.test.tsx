import { render } from '@testing-library/react';
import { getFeaturedEvents } from '../../src/data';
import IndexPage from '../../src/pages/index';
import { ThemeWrapper } from '../utils';

const featuredEvents = getFeaturedEvents();

describe('IndexPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<IndexPage events={featuredEvents} />, {
      wrapper: ThemeWrapper
    });
    expect(container).toBeTruthy();
  });
});
