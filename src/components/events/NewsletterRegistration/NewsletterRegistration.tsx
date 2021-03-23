import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  useToast
} from '@chakra-ui/react';
import NewsletterType, { newsletterSchema } from '../../../types/newsletter';

const NewsletterRegistration = (): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<NewsletterType>({
    resolver: yupResolver(newsletterSchema)
  });

  const toast = useToast();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(({ email }) => {
    setSubmitting(true);
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 500) {
          throw new Error('Something went wrong!');
        }
        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(data => {
        toast({
          description: data.message,
          status: 'success',
          duration: 4000,
          isClosable: true
        });
      })
      .catch(error => {
        toast({
          description: error.message,
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      })
      .finally(() => {
        reset();
        setSubmitting(false);
      });
  });

  return (
    <Box paddingY={8} paddingX={0} textAlign="center">
      <Heading as="h2" marginBottom={4} fontSize="2xl">
        Sign up to stay updated!
      </Heading>
      <Container maxW="sm" padding="0">
        <Flex as="form" onSubmit={onSubmit}>
          <Input
            borderRightRadius="0"
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={register}
          />
          <Button
            type="submit"
            colorScheme="primary"
            borderLeftRadius="0"
            flexShrink={0}
            isLoading={submitting}
            loadingText="Submitting"
            w="36"
          >
            Register
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default NewsletterRegistration;
