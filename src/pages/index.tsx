import { GetStaticProps } from 'next';
import { Container } from '@chakra-ui/react';
import EventList from '../components/events/EventList/EventList';
import Event from '../types/event';
import { getFeaturedEvents } from '../utils/api.utils';

type HomePageProps = {
  events: Event[];
};

const HomePage = ({ events }: HomePageProps): JSX.Element => {
  return (
    <Container maxW="container.sm" paddingY={4}>
      <EventList events={events} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const events = await getFeaturedEvents();

  return {
    props: {
      events
    }
  };
};

export default HomePage;
