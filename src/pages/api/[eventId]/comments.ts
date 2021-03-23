import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from '../../../next-connect';
import validate from '../../../middlewares/validate';
import { commentSchema } from '../../../types/comment';
import { getEventComments, saveComment } from '../../../data/comments';

const handler = nextConnect()
  .use(validate(commentSchema))
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const eventId = parseInt(req.query.eventId as string);
    const comments = getEventComments(eventId);
    res.status(200).json({ comments });
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const eventId = parseInt(req.query.eventId as string);
    const comment = saveComment({
      ...req.body,
      eventId
    });
    res.status(201).json({ comment });
  });

export default handler;
