import { useRouter } from 'next/router';
import { Container } from '@chakra-ui/react';
import EventList from '../../components/events/EventList/EventList';
import EventsSearch from '../../components/events/EventsSearch/EventsSearch';
import { getAllEvents } from '../../data';

const EventsPage = (): JSX.Element => {
  const router = useRouter();
  const events = getAllEvents();

  const handleSearchEvents = (year: number, month: number) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Container maxW="container.lg" paddingY={4}>
      <Container maxW="container.sm">
        <EventsSearch onSearch={handleSearchEvents} />
        <EventList events={events} />
      </Container>
    </Container>
  );
};

export default EventsPage;
