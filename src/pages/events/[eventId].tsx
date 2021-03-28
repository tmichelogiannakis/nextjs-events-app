import { GetStaticProps, NextPage } from 'next';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useTheme
} from '@chakra-ui/react';
import ImageRounded from '../../components/ui/ImageRounded';
import AddressIcon from '../../components/icons/AddressIcon';
import DateIcon from '../../components/icons/DateIcon';
import Comments from '../../components/events/Comments/Comments';
import Event from '../../types/event';
import { getAllEventsIds, getEvent } from '../../data/events';

type EventDetailPageProps = {
  event: Event;
};

const EventDetailPage: NextPage<EventDetailPageProps> = ({
  event
}): JSX.Element => {
  const theme = useTheme();

  const { id, title, image, date, location, description } = event;

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
          flexDirection={['column', 'row']}
        >
          <Box
            flexShrink={0}
            borderColor="white"
            borderRadius="50%"
            border="2px"
            height={theme.sizes[40]}
            width={theme.sizes[40]}
          >
            <ImageRounded
              src={`/${image}`}
              alt={title}
              objectFit="cover"
              width={320}
              height={320}
            />
          </Box>
          <Flex
            flexGrow={1}
            justifyContent="space-between"
            flexDirection="column"
            paddingLeft={['0', '8']}
            paddingTop={['4', '0']}
            textAlign={['center', 'left']}
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
        <Comments eventId={id} />
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
    const eventId = params.eventId;

    const event = getEvent(+eventId);

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

export const getStaticPaths = async (): Promise<{
  paths: {
    params: {
      eventId: string;
    };
  }[];
  fallback: string;
}> => {
  const eventIds = getAllEventsIds();
  const paths = eventIds.map(eventId => ({ params: { eventId } }));
  return {
    paths,
    fallback: 'blocking'
  };
};

export default EventDetailPage;
