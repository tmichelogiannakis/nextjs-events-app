import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Container } from '@chakra-ui/react';
import EventList from '../../components/events/EventList/EventList';
import EventsSearch from '../../components/events/EventsSearch/EventsSearch';
import Event from '../../types/event';
import { getAllEvents } from '../../utils/api.utils';

type EventsPageProps = {
  events: Event[];
};

const EventsPage = ({ events }: EventsPageProps): JSX.Element => {
  const router = useRouter();

  const handleSearchEvents = (year: number, month: number) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Container maxW="container.lg" paddingY={4}>
      <Container maxW="container.sm">
        <EventsSearch onSearch={handleSearchEvents} marginBottom="4" />
        <EventList events={events} />
      </Container>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events
    },
    revalidate: 3600
  };
};

export default EventsPage;
