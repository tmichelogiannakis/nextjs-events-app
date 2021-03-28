import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Alert, Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import EventList from '../../components/events/EventList/EventList';
import Event from '../../types/event';
import { getFiltredEvents } from '../../data/events';

type FiltredEventsPageProps = {
  invalidFilter?: boolean;
  events?: Event[];
  filters?: { numYear: number; numMonth: number };
};

const FiltredEventsPage: NextPage<FiltredEventsPageProps> = ({
  invalidFilter,
  events,
  filters
}): JSX.Element => {
  if (invalidFilter) {
    return (
      <Container maxW="container.sm" paddingY={4} textAlign="center">
        <Alert display="inline-block" marginBottom="2" width="auto">
          <Text> Invalid filter. Please adjust your values!</Text>
        </Alert>
        <Box>
          <Link href="/events">
            <Button as="a" href="/events" colorScheme="primary">
              Browse All Events
            </Button>
          </Link>
        </Box>
      </Container>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Container maxW="container.sm" paddingY={4} textAlign="center">
        <Alert display="inline-block" marginBottom="2" width="auto">
          <Text>No events found for the chosen filter!</Text>
        </Alert>
        <Box>
          <Link href="/events">
            <Button as="a" href="/events" colorScheme="primary">
              Browse All Events
            </Button>
          </Link>
        </Box>
      </Container>
    );
  }

  const date = filters ? new Date(filters.numYear, filters.numMonth - 1) : null;

  return (
    <Container maxW="container.sm" paddingY={4}>
      <Box textAlign="center" marginBottom="4">
        {date && (
          <Heading marginBottom="4">
            Events in{' '}
            {date.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })}
          </Heading>
        )}
        <Link href="/events">
          <Button as="a" href="/events" colorScheme="primary">
            Browse All Events
          </Button>
        </Link>
      </Box>
      <EventList events={events} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<
  FiltredEventsPageProps,
  {
    slug: string[];
  }
> = async ({ params }) => {
  if (params) {
    const { slug } = params;
    if (slug && slug.length === 2) {
      const [year, month] = slug;
      const numYear = +year;
      const numMonth = +month;

      if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
      ) {
        return {
          props: {
            invalidFilter: true
          }
        };
      }

      const events = getFiltredEvents(numYear, numMonth);

      return {
        props: {
          events,
          filters: { numYear, numMonth }
        }
      };
    }
  }

  return {
    notFound: true
  };
};

export default FiltredEventsPage;
