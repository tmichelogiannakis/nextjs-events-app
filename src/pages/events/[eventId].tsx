import { Container, Heading } from '@chakra-ui/react';

const EventDetailPage = (): JSX.Element => {
  return (
    <Container maxW="container.lg" paddingY={4}>
      <Heading as="h1" textAlign="center">
        Event Detail
      </Heading>
    </Container>
  );
};

export default EventDetailPage;
