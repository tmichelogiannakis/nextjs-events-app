import { Container, Heading } from '@chakra-ui/react';

const HomePage = (): JSX.Element => {
  return (
    <Container maxW="container.lg" paddingY={4}>
      <Heading as="h1" textAlign="center">
        The Home Page
      </Heading>
    </Container>
  );
};

export default HomePage;