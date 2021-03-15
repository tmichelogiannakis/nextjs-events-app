import Link from 'next/link';
import Image from 'next/image';
import { Button, Box, Flex, Heading, ListItem } from '@chakra-ui/react';
import Event from '../../../types/event';
import AddressIcon from '../../icons/AddressIcon';
import DateIcon from '../../icons/DateIcon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';

type EventListItemProps = {
  event: Event;
};

const EventListItem = ({ event }: EventListItemProps): JSX.Element => {
  const { id, title, image, date, location } = event;

  return (
    <ListItem
      borderRadius="md"
      marginBottom={4}
      display="flex"
      background="white"
      boxShadow="md"
      flexDirection={['column', 'row']}
      maxWidth={['sm', '100%']}
      marginX="auto"
    >
      <Box width={['100%', '40%']}>
        <Image src={`/${image}`} width={480} height={480} objectFit="cover" />
      </Box>
      <Flex flexDirection="column" padding={4} width={['100%', '60%']}>
        <Box flexGrow={1}>
          <Heading marginBottom={2} fontSize="2xl">
            {title}
          </Heading>
          <Flex alignItems="center" mb={1}>
            <DateIcon fontSize="lg" />
            <Box as="time" dateTime={date} pl={2}>
              {new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Box>
          </Flex>
          <Flex alignItems="center" mb={2}>
            <AddressIcon fontSize="lg" />
            <Box as="address" pl={2}>
              {location}
            </Box>
          </Flex>
        </Box>
        <Flex justifyContent="flex-end">
          <Link href={`/events/${id}`}>
            <Button
              as="a"
              href={`/events/${id}`}
              colorScheme="primary"
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
