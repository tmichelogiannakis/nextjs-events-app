import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from '../../next-connect';
import validate from '../../middlewares/validate';
import { newsletterSchema } from '../../types/newsletter';
import { registerToNewsletter } from '../../data/newsletter';

const handler = nextConnect()
  .use(validate(newsletterSchema))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const email = req.body.email;
    registerToNewsletter(email);
    res.status(201).json({
      message: 'You have been successfully subscribed to the newsletter!'
    });
  });

export default handler;
