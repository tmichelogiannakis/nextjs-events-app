import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useTheme,
  useToast
} from '@chakra-ui/react';
import Comment from '../../../types/comment';
import { EMAIL_REGEXP } from '../../../constants';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  text: yup.string().required('Comment is required')
});

type FormValues = yup.InferType<typeof schema>;

type NewCommentProps = BoxProps & {
  onAddComment: (comment: Comment) => Promise<{ message: string }>;
};

const NewComment = ({
  onAddComment,
  ...otherProps
}: NewCommentProps): JSX.Element => {
  const theme = useTheme();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState: { isSubmitted }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit(data => {
    const toastId = toast({
      description: 'Your comment was submitted!',
      status: 'info'
    });

    onAddComment(data)
      .then(({ message }) => {
        toast({
          description: message,
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
        if (toastId) {
          toast.close(toastId);
        }
        reset();
      });
  });

  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      paddingX="4"
      paddingY="2"
      borderRadius="md"
      background="teal"
      color="white"
      {...otherProps}
    >
      <Flex flexDirection={['column', 'row']}>
        <FormControl id="year" padding="2">
          <FormLabel htmlFor="email" marginBottom="1">
            Email
          </FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            ref={register({ required: true, pattern: EMAIL_REGEXP })}
            css={{
              borderColor: 'white',
              ':hover,:focus': {
                borderColor: 'white'
              },
              ':focus': {
                borderColor: 'white',
                boxShadow: '0 0 0 1px #ffffff'
              }
            }}
          />
          {errors.email && (
            <Text
              color={theme.colors.red[300]}
              textAlign="left"
              marginTop="1"
              fontSize="sm"
            >
              {errors.email.message}
            </Text>
          )}
        </FormControl>
        <FormControl id="name" padding="2">
          <FormLabel htmlFor="name" marginBottom="1">
            Name
          </FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            ref={register({ required: true })}
            css={{
              borderColor: 'white',
              ':hover,:focus': {
                borderColor: 'white'
              },
              ':focus': {
                borderColor: 'white',
                boxShadow: '0 0 0 1px #ffffff'
              }
            }}
          />
          {errors.name && (
            <Text
              color={theme.colors.red[300]}
              textAlign="left"
              marginTop="1"
              fontSize="sm"
            >
              {errors.name.message}
            </Text>
          )}
        </FormControl>
      </Flex>
      <FormControl id="year" padding="2">
        <FormLabel htmlFor="comment" marginBottom="1">
          Your comment
        </FormLabel>
        <Textarea
          id="comment"
          name="text"
          ref={register({ required: true })}
          display="block"
          css={{
            borderColor: 'white',
            ':hover,:focus': {
              borderColor: 'white'
            },
            ':focus': {
              borderColor: 'white',
              boxShadow: '0 0 0 1px #ffffff'
            }
          }}
        />
        {errors.text && (
          <Text
            color={theme.colors.red[300]}
            textAlign="left"
            marginTop="1"
            fontSize="sm"
          >
            {errors.text.message}
          </Text>
        )}
      </FormControl>
      <Box padding="2">
        <Button
          type="submit"
          variant="white"
          bg="white"
          color={theme.colors.primary[500]}
          disabled={isSubmitted}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default NewComment;
