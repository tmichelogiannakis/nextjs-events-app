import NextLink from 'next/link';
import {
  Box,
  Container,
  Flex,
  Link,
  List,
  ListItem,
  useTheme
} from '@chakra-ui/react';

const Header = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box backgroundColor={theme.colors.gray[700]}>
      <Container maxWidth="container.lg" paddingX="0">
        <Flex
          as="header"
          justifyContent="space-between"
          alignItems="center"
          padding="4"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            color="white"
            fontSize="2xl"
          >
            <Link as={NextLink} href="/">
              NextEvents
            </Link>
          </Flex>
          <Box as="nav">
            <List color="white">
              <ListItem>
                <Link as={NextLink} href="/events">
                  Browse All Events
                </Link>
              </ListItem>
            </List>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
