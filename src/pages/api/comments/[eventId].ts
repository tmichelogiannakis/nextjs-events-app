import { NextApiRequest, NextApiResponse } from 'next';
import { EMAIL_REGEXP } from '../../../constants';
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

    // lets validate only email
    if (!EMAIL_REGEXP.test(email)) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    try {
      const comment = saveComment({
        email,
        name,
        text,
        eventId
      });
      res.status(201).json({ comment });
    } catch {
      res.status(500).json({ message: 'Something wend wrong' });
    }
  }
};

export default handler;
