import {
  Box,
  Text,
  List,
  ListProps,
  ListItem,
  useTheme
} from '@chakra-ui/react';
import CommentType from '../../../types/comment';

type CommentListProps = ListProps & {
  comments: CommentType[];
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
                By {comment.name}
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
