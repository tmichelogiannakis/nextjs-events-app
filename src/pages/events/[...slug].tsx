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
    return (
      <Text as="p" textAlign="center">
        Loading...
      </Text>
    );
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
      <Container maxW="container.sm" paddingY={4}>
        <Alert
          status="warning"
          display="block"
          textAlign="center"
          borderRadius="md"
        >
          <Text as="p" marginBottom="2">
            Invalid filter. Please adjust your values!
          </Text>
          <Link href="/events">
            <Button as="a" href="/events" colorScheme="teal">
              Browse All Events
            </Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Container maxW="container.sm" paddingY={4}>
        <Alert
          status="warning"
          display="block"
          textAlign="center"
          borderRadius="md"
        >
          <Text as="p" marginBottom="2">
            No events found for the chosen filter!
          </Text>
          <Link href="/events">
            <Button as="a" href="/events" colorScheme="teal">
              Browse All Events
            </Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <Container maxW="container.lg" paddingY={4}>
      <Box textAlign="center" marginBottom="4">
        <Heading marginBottom="4">Events in {humanReadableDate}</Heading>
        <Link href="/events">
          <Button as="a" href="/events" colorScheme="teal">
            Browse All Events
          </Button>
        </Link>
      </Box>
      <Container maxW="container.sm">
        <EventList events={filteredEvents} />
      </Container>
    </Container>
  );
};

export default FiltredEventsPage;
