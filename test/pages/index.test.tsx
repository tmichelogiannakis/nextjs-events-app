import { render } from '@testing-library/react';
import IndexPage from '../../src/pages/index';
import { ThemeWrapper } from '../utils';

const featuredEvents = [
  {
    id: 2,
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: 'images/introvert-event.jpg',
    isFeatured: true
  },
  {
    id: 3,
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    image: 'images/extrovert-event.jpg',
    isFeatured: true
  }
];

describe('IndexPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<IndexPage events={featuredEvents} />, {
      wrapper: ThemeWrapper
    });
    expect(container).toBeTruthy();
  });
});
