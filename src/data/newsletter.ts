import db from '.';

export const registerToNewsletter = (email: string): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!db.get('newsletter').find({ email }).value()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    db.get('newsletter').push({ email }).write();
  }
};
