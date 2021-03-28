import { GetStaticProps, NextPage } from 'next';
import { Container } from '@chakra-ui/react';
import EventList from '../components/events/EventList/EventList';
import NewsletterRegistration from '../components/events/NewsletterRegistration/NewsletterRegistration';
import Event from '../types/event';
import { getFeaturedEvents } from '../data/events';

type HomePageProps = {
  events: Event[];
};

const HomePage: NextPage<HomePageProps> = ({ events }): JSX.Element => {
  return (
    <Container maxW="container.sm" paddingY={4}>
      <NewsletterRegistration />
      <EventList events={events} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const events = getFeaturedEvents();

  return {
    props: {
      events
    },
    revalidate: 3600
  };
};

export default HomePage;
