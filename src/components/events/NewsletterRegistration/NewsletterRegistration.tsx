import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  useToast
} from '@chakra-ui/react';
import { EMAIL_REGEXP } from '../../../constants';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required')
});

type FormValues = yup.InferType<typeof schema>;

const NewsletterRegistration = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const toast = useToast();

  const onSubmit = handleSubmit(({ email }) => {
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
            ref={register({ required: true, pattern: EMAIL_REGEXP })}
          />
          <Button
            type="submit"
            colorScheme="primary"
            borderLeftRadius="0"
            flexShrink={0}
            disabled={isSubmitted}
          >
            Register
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default NewsletterRegistration;
