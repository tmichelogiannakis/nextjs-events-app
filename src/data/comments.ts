import { v4 as uuid } from 'uuid';
import db from '.';
import CommentType from '../types/comment';

export const getEventComments = (eventId: number): CommentType[] => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return db.get('comments').filter({ eventId }).value();
};

export const saveComment = (comment: CommentType): CommentType => {
  const newComment = { ...comment, id: uuid() };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  db.get('comments').push(newComment).write();
  return newComment;
};
