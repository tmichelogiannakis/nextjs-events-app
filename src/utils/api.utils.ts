import Event from '../types/event';

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await fetch(
    'https://firestore.googleapis.com/v1/projects/react-events-7427e/databases/(default)/documents/events/'
  );

  const { documents } = await response.json();

  return documents.map((document: any) => {
    const { name, fields } = document;
    return Object.entries(fields).reduce(
      (acc, [key, obj]: any) => ({ ...acc, [key]: Object.values(obj)[0] }),
      {
        id: name.slice(name.lastIndexOf('/') + 1)
      }
    );
  });
};

export const getFeaturedEvents = async (): Promise<Event[]> => {
  const events = await getAllEvents();
  return events.filter(event => event.isFeatured);
};

export const getAllEventIds = async (): Promise<string[]> => {
  const events = await getAllEvents();
  return events.map(event => event.id);
};

export const getEventById = async (id: string): Promise<Event | undefined> => {
  const events = await getAllEvents();
  return events.find(event => event.id === id);
};