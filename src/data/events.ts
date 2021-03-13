import db from '.';
import Event from '../types/event';

export const getAllEvents = (): Event[] => {
  return db.get('events').value();
};

export const getFeaturedEvents = (): Event[] => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return db.get('events').filter({ isFeatured: true }).value();
};

export const getAllEventsIds = (): string[] => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return db.get('events').map('id').value().map(toString);
};

export const getEvent = (eventId: number): Event => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return db.get('events').find({ id: eventId }).value();
};

export const getFiltredEvents = (
  numYear: number,
  numMonth: number
): Event[] => {
  return (
    db
      .get('events')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .filter(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === numYear &&
          eventDate.getMonth() === numMonth - 1
        );
      })
      .value()
  );
};
