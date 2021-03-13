import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Container } from '@chakra-ui/react';
import EventList from '../../components/events/EventList/EventList';
import EventsSearch from '../../components/events/EventsSearch/EventsSearch';
import Event from '../../types/event';
import db from '../../db';

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
    <Container maxW="container.sm" paddingY={4}>
      <EventsSearch onSearch={handleSearchEvents} marginBottom="4" />
      <EventList events={events} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const events: Event[] = db.get('events').value();
  return {
    props: {
      events
    },
    revalidate: 3600
  };
};

export default EventsPage;
