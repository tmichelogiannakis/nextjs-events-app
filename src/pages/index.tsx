import { Container, Heading } from '@chakra-ui/react';
import EventList from '../components/events/EventList/EventList';
import { getFeaturedEvents } from '../data';

const HomePage = (): JSX.Element => {
  const featuredEvents = getFeaturedEvents();

  return (
    <Container maxW="container.lg" paddingY={4}>
      <Heading as="h1" textAlign="center" mb={4}>
        The Home Page
      </Heading>
      <Container maxW="container.sm">
        <EventList events={featuredEvents} />
      </Container>
    </Container>
  );
};

export default HomePage;
