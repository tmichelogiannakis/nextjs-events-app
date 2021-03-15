import { NextApiRequest, NextApiResponse } from 'next';
import { EMAIL_REGEXP } from '../../constants';
import { registerToNewsletter } from '../../data/newsletter';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!EMAIL_REGEXP.test(email)) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    try {
      registerToNewsletter(email);
      res.status(201).json({
        message: 'You have been successfully subscribed to the newsletter!'
      });
    } catch {
      res.status(500).json({ message: 'Something wend wrong' });
    }
  }
};

export default handler;
