import { useMemo, useState } from 'react';
import { Box, Button, Container } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr';
import CommentList from './CommentList';
import NewComment from './NewComment';
import CommentType from '../../../types/comment';

type CommentsProps = {
  eventId: number;
};

const Comments = (props: CommentsProps): JSX.Element => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  const { data } = useSWR(`/api/${eventId}/comments`);

  const comments = useMemo(() => {
    return data?.comments;
  }, [data]);

  const toggleCommentsHandler = () => {
    setShowComments(prevStatus => !prevStatus);
  };

  const handleAddComment = async (
    comment: CommentType
  ): Promise<{ message: string }> => {
    return fetch(`/api/${eventId}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
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
        return mutate(`/api/comments/${eventId}`, data).then(() => ({
          message: 'Your comment was saved!'
        }));
      });
  };

  return (
    <Container maxW="lg" textAlign="center" marginY="8">
      <Button
        variant="outline"
        colorScheme="primary"
        onClick={toggleCommentsHandler}
      >
        {showComments ? 'Hide' : 'Show'} Comments
      </Button>
      {showComments && (
        <Box>
          <NewComment marginTop="4" onAddComment={handleAddComment} />
          <CommentList marginTop="4" comments={comments} />
        </Box>
      )}
    </Container>
  );
};

export default Comments;
