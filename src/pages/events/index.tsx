import { Container, Heading } from '@chakra-ui/react';
import EventList from '../../components/events/EventList/EventList';
import { getAllEvents } from '../../data';

const EventsPage = (): JSX.Element => {
  const events = getAllEvents();

  return (
    <Container maxW="container.lg" paddingY={4}>
      <Heading as="h1" textAlign="center" mb={4}>
        All Events
      </Heading>
      <Container maxW="container.sm">
        <EventList events={events} />
      </Container>
    </Container>
  );
};

export default EventsPage;
