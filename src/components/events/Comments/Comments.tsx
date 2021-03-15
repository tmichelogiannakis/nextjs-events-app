import { useMemo, useState } from 'react';
import { Box, Button, Container } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr';
import CommentList from './CommentList';
import NewComment from './NewComment';
import Comment from '../../../types/comment';

type CommentsProps = {
  eventId: number;
};

const Comments = (props: CommentsProps): JSX.Element => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  const { data } = useSWR(`/api/comments/${eventId}`);

  const comments = useMemo(() => {
    return data?.comments;
  }, [data]);

  const toggleCommentsHandler = () => {
    setShowComments(prevStatus => !prevStatus);
  };

  const handleAddComment = async (comment: Comment): Promise<unknown> => {
    const sendComment = async (comment: Comment) => {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.json();
    };
    return mutate(`/api/comments/${eventId}`, await sendComment(comment));
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
