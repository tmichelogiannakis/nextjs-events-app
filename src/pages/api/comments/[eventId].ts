import { NextApiRequest, NextApiResponse } from 'next';
import { getEventComments, saveComment } from '../../../data/comments';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'GET') {
    const eventId = parseInt(req.query.eventId as string);
    const comments = getEventComments(eventId);
    res.status(200).json({ comments });
  }

  if (req.method === 'POST') {
    const eventId = parseInt(req.query.eventId as string);
    const { email, name, text } = req.body;
    const comment = saveComment({
      email,
      name,
      text,
      eventId
    });
    res.status(200).json({ comment });
  }
};

export default handler;
