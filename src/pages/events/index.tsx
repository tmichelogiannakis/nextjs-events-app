import { Container, Heading } from '@chakra-ui/react';

const EventsPage = (): JSX.Element => {
  return (
    <Container maxW="container.lg" paddingY={4}>
      <Heading as="h1" textAlign="center">
        All Events
      </Heading>
    </Container>
  );
};

export default EventsPage;
