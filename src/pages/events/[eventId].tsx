import { GetStaticProps } from 'next';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useTheme
} from '@chakra-ui/react';
import ImageCover from '../../components/ui/ImageCover';
import AddressIcon from '../../components/icons/AddressIcon';
import DateIcon from '../../components/icons/DateIcon';
import Event from '../../types/event';
import { getEventById, getFeaturedEventsIds } from '../../utils/api.utils';

type EventDetailPageProps = {
  event: Event;
};

const EventDetailPage = ({ event }: EventDetailPageProps): JSX.Element => {
  const theme = useTheme();

  const { title, image, date, location, description } = event;

  return (
    <Box>
      <Box
        css={{
          background: `linear-gradient(to bottom left, ${theme.colors.primary[500]}, ${theme.colors.primary[800]})`
        }}
      >
        <Heading
          as="h1"
          textAlign="center"
          fontSize="4xl"
          color="white"
          paddingTop="8"
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
            <ImageCover src={`/${image}`} alt={title} borderRadius="50%" />
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
                {new Date(date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
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
        <Text textAlign="center">{description}</Text>
      </Container>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<
  EventDetailPageProps,
  {
    eventId: string;
  }
> = async ({ params }) => {
  if (params) {
    const { eventId } = params;
    const event = await getEventById(eventId);

    if (event) {
      return {
        props: {
          event
        },
        revalidate: 3600
      };
    }
  }

  return {
    notFound: true
  };
};

export const getStaticPaths = async () => {
  const eventIds = await getFeaturedEventsIds();
  const paths = eventIds.map(eventId => ({ params: { eventId } }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export default EventDetailPage;
