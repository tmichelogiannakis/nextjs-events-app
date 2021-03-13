import { GetStaticProps } from 'next';
import { Container } from '@chakra-ui/react';
import EventList from '../components/events/EventList/EventList';
import Event from '../types/event';
import db from '../db';

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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const events: Event[] = db.get('events').filter({ isFeatured: true }).value();

  return {
    props: {
      events
    },
    revalidate: 3600
  };
};

export default HomePage;
