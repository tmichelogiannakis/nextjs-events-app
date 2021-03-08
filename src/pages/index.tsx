import { Container } from '@chakra-ui/react';
import EventList from '../components/events/EventList/EventList';
import { getFeaturedEvents } from '../data';

const HomePage = (): JSX.Element => {
  const featuredEvents = getFeaturedEvents();

  return (
    <Container maxW="container.lg" paddingY={4}>
      <Container maxW="container.sm">
        <EventList events={featuredEvents} />
      </Container>
    </Container>
  );
};

export default HomePage;
