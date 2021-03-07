import { FC } from 'react';
import {
  Box,
  BoxProps,
  Code,
  Container,
  Heading,
  Grid,
  Text
} from '@chakra-ui/react';

const Card: FC<BoxProps & React.HTMLProps<HTMLAnchorElement>> = ({
  children
}) => {
  return (
    <Box
      w="100%"
      p={8}
      borderRadius="lg"
      borderWidth="1px"
      as="a"
      href="https://nextjs.org/learn"
      css={{
        ':hover': {
          borderColor: '#0070f3',
          transition: 'color 0.15s ease, border-color 0.15s ease;',
          color: '#0070f3'
        }
      }}
    >
      {children}
    </Box>
  );
};

const Home = (): JSX.Element => {
  return (
    <Container maxW="container.lg" paddingY={6}>
      <Box textAlign="center">
        <Heading as="h1" fontSize="64" fontWeight={400} mb={4}>
          Welcome to{' '}
          <a href="https://nextjs.org" style={{ color: '#0070f3' }}>
            Next.js!
          </a>
        </Heading>
        <Text as="p" fontSize="24">
          Get started by editing <Code fontSize="24">pages/index.js</Code>
        </Text>
      </Box>
      <Container maxW="container.md" marginTop={12}>
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <Card href="https://nextjs.org/docs">
            <Heading as="h3" fontSize="24" fontWeight={400} mb={4}>
              Documentation &rarr;
            </Heading>
            <Text as="p" fontSize="20">
              Find in-depth information about Next.js features and API.
            </Text>
          </Card>
          <Card href="https://nextjs.org/learn">
            <Heading as="h3" fontSize="24" fontWeight={400} mb={4}>
              Learn &rarr;
            </Heading>
            <Text as="p" fontSize="20">
              Learn about Next.js in an interactive course with quizzes!
            </Text>
          </Card>
          <Card href="https://github.com/vercel/next.js/tree/master/examples">
            <Heading as="h3" fontSize="24" fontWeight={400} mb={4}>
              Examples &rarr;
            </Heading>
            <Text as="p" fontSize="20">
              Discover and deploy boilerplate example Next.js projects.
            </Text>
          </Card>
          <Card href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <Heading as="h3" fontSize="24" fontWeight={400} mb={4}>
              Deploy &rarr;
            </Heading>
            <Text as="p" fontSize="20">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </Text>
          </Card>
        </Grid>
      </Container>
    </Container>
  );
};

export default Home;
