import { List } from '@chakra-ui/react';
import EventListItem from './EventListItem';
import Event from '../../../types/event';

type EventListProps = {
  events: Event[];
};

const EventList = ({ events }: EventListProps): JSX.Element => {
  return (
    <List>
      {events.map(event => (
        <EventListItem key={event.id} event={event} />
      ))}
    </List>
  );
};

export default EventList;
