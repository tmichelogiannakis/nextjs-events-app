import { useRouter } from 'next/router';
import Link from 'next/link';
import { Alert, Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import EventList from '../../components/events/EventList/EventList';
import { getFilteredEvents } from '../../data';

const FiltredEventsPage = (): JSX.Element => {
  const {
    query: { slug }
  } = useRouter();

  if (!slug) {
    return <Text textAlign="center">Loading...</Text>;
  }

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

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  if (!filteredEvents || filteredEvents.length === 0) {
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

  const date = new Date(numYear, numMonth - 1);

  return (
    <Container maxW="container.sm" paddingY={4}>
      <Box textAlign="center" marginBottom="4">
        <Heading marginBottom="4">
          Events in{' '}
          {date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
          })}
        </Heading>
        <Link href="/events">
          <Button as="a" href="/events" colorScheme="primary">
            Browse All Events
          </Button>
        </Link>
      </Box>
      <EventList events={filteredEvents} />
    </Container>
  );
};

export default FiltredEventsPage;
