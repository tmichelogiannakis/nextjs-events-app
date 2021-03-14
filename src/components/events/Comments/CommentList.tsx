import {
  Box,
  Text,
  List,
  ListProps,
  ListItem,
  useTheme
} from '@chakra-ui/react';
import Comment from '../../../types/comment';

type CommentListProps = ListProps & {
  comments: Comment[];
};

const CommentList = ({
  comments,
  ...otherProps
}: CommentListProps): JSX.Element | null => {
  const theme = useTheme();

  if (comments) {
    return (
      <List textAlign="left" {...otherProps}>
        {comments.map(comment => (
          <ListItem
            key={comment.id}
            paddingY="2"
            borderBottom="2px"
            borderColor={theme.colors.gray[300]}
          >
            <Text marginBottom="1">{comment.text}</Text>
            <Box>
              <Text textAlign="right" textStyle="italic">
                By
                <Box as="address" display="inline">
                  {comment.name}
                </Box>
              </Text>
            </Box>
          </ListItem>
        ))}
      </List>
    );
  }
  return null;
};

export default CommentList;
