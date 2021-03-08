import {
  Alert,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useTheme
} from '@chakra-ui/react';
import { useRouter } from 'next//router';
import AddressIcon from '../../components/icons/AddressIcon';
import DateIcon from '../../components/icons/DateIcon';
import Event from '../../types/event';
import { getEventById } from '../../data';

const EventDetailPage = (): JSX.Element => {
  const {
    query: { eventId }
  } = useRouter();

  const theme = useTheme();

  const event: Event | undefined = getEventById(eventId as string);

  if (!event) {
    return (
      <Container maxW="container.sm">
        <Alert status="warning">
          <p>No event found!</p>
        </Alert>
      </Container>
    );
  }

  const { title, image, date, location, description } = event;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Box>
      <Box
        css={{
          background: `linear-gradient(to bottom left, ${theme.colors.teal[500]}, ${theme.colors.teal[800]})`
        }}
      >
        <Heading
          as="h1"
          textAlign="center"
          fontSize="4xl"
          color="white"
          paddingTop="12"
          paddingBottom="32"
          paddingX="4"
        >
          {title}
        </Heading>
      </Box>
      <Container maxW="container.sm">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          boxShadow={theme.shadows.sm}
          borderRadius="md"
          backgroundColor={theme.colors.gray[700]}
          color="white"
          padding="8"
          margin={`-${theme.sizes[24]} auto`}
        >
          <Box
            flexShrink={0}
            border="4px"
            borderColor="white"
            borderRadius="50%"
            height={theme.sizes[40]}
            width={theme.sizes[40]}
          >
            <Image
              src={`/${image}`}
              alt={title}
              borderRadius="50%"
              objectFit="cover"
              css={{
                height: '100%',
                width: '100%'
              }}
            />
          </Box>
          <Flex
            flexGrow={1}
            justifyContent="space-between"
            flexDirection="column"
            paddingLeft="8"
          >
            <Box paddingY="1">
              <Box paddingY="1">
                <DateIcon fontSize="xl" />
              </Box>
              <Box as="time" dateTime={date}>
                {humanReadableDate}
              </Box>
            </Box>
            <Box paddingY="1">
              <Box paddingY="1">
                <AddressIcon fontSize="xl" />
              </Box>
              <Box as="address">{location}</Box>
            </Box>
          </Flex>
        </Flex>
      </Container>
      <Container
        maxW="container.md"
        fontSize="2xl"
        marginTop="32"
        color={theme.colors.gray[600]}
      >
        <Text as="p" lineHeight="normal" textAlign="center">
          {description}
        </Text>
      </Container>
    </Box>
  );
};

export default EventDetailPage;
