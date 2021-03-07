import { Container, Heading } from '@chakra-ui/react';

const FiltredEventsPage = (): JSX.Element => {
  return (
    <Container maxW="container.lg" paddingY={4}>
      <Heading as="h1" textAlign="center">
        All Filtred Events
      </Heading>
    </Container>
  );
};

export default FiltredEventsPage;
