import { SyntheticEvent, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  useTheme
} from '@chakra-ui/react';

const NewsletterRegistration = (): JSX.Element => {
  const theme = useTheme();

  const [subscribed, setSubscribed] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const email = emailInputRef.current?.value;

    if (email) {
      fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(() => {
          setSubscribed(true);
        });
    }
  };

  return (
    <Box paddingY={8} paddingX={0} textAlign="center">
      <Heading as="h2" marginBottom={4} fontSize="2xl">
        Sign up to stay updated!
      </Heading>
      {subscribed ? (
        <Alert status="success" width="auto" display="inline-block">
          <Text>You have been successfully subscribed to the newsletter!</Text>
        </Alert>
      ) : (
        <Container maxW={theme.space[80]} padding="0">
          <Flex as="form" onSubmit={handleSubmit}>
            <Input
              borderRightRadius="0"
              type="email"
              id="email"
              placeholder="Your email"
              aria-label="Your email"
              ref={emailInputRef}
            />
            <Button
              type="submit"
              colorScheme="primary"
              borderLeftRadius="0"
              flexShrink={0}
            >
              Register
            </Button>
          </Flex>
        </Container>
      )}
    </Box>
  );
};

export default NewsletterRegistration;
