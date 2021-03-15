import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text
} from '@chakra-ui/react';
import { EMAIL_REGEXP } from '../../../constants';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required')
});

type FormValues = yup.InferType<typeof schema>;

const NewsletterRegistration = (): JSX.Element => {
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit(({ email }) => {
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
  });

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
        <Container maxW="sm" padding="0">
          <Flex as="form" onSubmit={onSubmit}>
            <Input
              borderRightRadius="0"
              type="email"
              id="email"
              placeholder="Your email"
              aria-label="Your email"
              ref={register({ required: true, pattern: EMAIL_REGEXP })}
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
