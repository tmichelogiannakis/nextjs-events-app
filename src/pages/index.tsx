import { Container } from '@chakra-ui/react';
import EventList from '../components/events/EventList/EventList';
import { getFeaturedEvents } from '../data';

const HomePage = (): JSX.Element => {
  const featuredEvents = getFeaturedEvents();

  return (
    <Container maxW="container.sm" paddingY={4}>
      <EventList events={featuredEvents} />
    </Container>
  );
};

export default HomePage;
