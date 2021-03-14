import { useRef, SyntheticEvent } from 'react';
import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useTheme
} from '@chakra-ui/react';
import Comment from '../../../types/comment';

type NewCommentProps = BoxProps & {
  onAddComment: (comment: Comment) => void;
};

const NewComment = ({
  onAddComment,
  ...otherProps
}: NewCommentProps): JSX.Element => {
  const theme = useTheme();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const email = emailInputRef.current?.value;
    const name = nameInputRef.current?.value;
    const text = commentInputRef.current?.value;

    if (email && name && text) {
      onAddComment({
        email,
        name,
        text
      });
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      paddingX="4"
      paddingY="2"
      borderRadius="md"
      background="teal"
      color="white"
      {...otherProps}
    >
      <Flex>
        <FormControl id="year" padding="2">
          <FormLabel htmlFor="email" marginBottom="1">
            Email
          </FormLabel>
          <Input
            type="email"
            id="email"
            ref={emailInputRef}
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
        </FormControl>
        <FormControl id="name" padding="2">
          <FormLabel htmlFor="name" marginBottom="1">
            Name
          </FormLabel>
          <Input
            type="text"
            id="name"
            ref={nameInputRef}
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
        </FormControl>
      </Flex>
      <FormControl id="year" padding="2">
        <FormLabel htmlFor="comment" marginBottom="1">
          Your comment
        </FormLabel>
        <Textarea
          id="comment"
          ref={commentInputRef}
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
      </FormControl>
      <Box padding="2">
        <Button
          type="submit"
          variant="white"
          bg="white"
          color={theme.colors.primary[500]}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default NewComment;
