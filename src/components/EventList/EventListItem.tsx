import Link from 'next/link';
import {
  Button,
  Box,
  Flex,
  Heading,
  Image,
  ListItem,
  useTheme
} from '@chakra-ui/react';
import Event from '../../types/event';
import AddressIcon from '../Icons/AddressIcon';
import DateIcon from '../Icons/DateIcon';
import ArrowRightIcon from '../Icons/ArrowRightIcon';

type EventListItemProps = {
  event: Event;
};

const EventListItem = ({ event }: EventListItemProps): JSX.Element => {
  const { id, title, image, date, location } = event;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const exploreLink = `/events/${id}`;

  const theme = useTheme();

  console.log({ theme });

  return (
    <ListItem
      borderRadius="md"
      marginBottom={4}
      display="flex"
      background="white"
      boxShadow="md"
      css={{ height: theme.sizes[60] }}
    >
      <Box css={{ width: '40%' }}>
        <Image
          src={`/${image}`}
          alt={title}
          css={{
            'object-fit': 'cover',
            height: '100%',
            width: '100%',
            borderTopLeftRadius: theme.radii.md,
            borderBottomLeftRadius: theme.radii.md
          }}
        />
      </Box>
      <Flex flexDirection="column" css={{ width: '60%' }} padding={4}>
        <Box flexGrow={1}>
          <Heading marginBottom={2} fontSize="2xl" fontWeight="normal">
            {title}
          </Heading>
          <Flex alignItems="center" mb={1}>
            <DateIcon fontSize="lg" />
            <Box as="time" dateTime={date} pl={2}>
              {humanReadableDate}
            </Box>
          </Flex>
          <Flex alignItems="center" mb={1}>
            <AddressIcon fontSize="lg" />
            <Box as="address" pl={2}>
              {location}
            </Box>
          </Flex>
        </Box>
        <Flex justifyContent="flex-end">
          <Link href={exploreLink}>
            <Button
              as="a"
              href={exploreLink}
              colorScheme="teal"
              rightIcon={<ArrowRightIcon />}
            >
              Explore
            </Button>
          </Link>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default EventListItem;
