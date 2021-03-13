import { NextApiRequest, NextApiResponse } from 'next';
import { registerToNewsletter } from '../../data/newsletter';

// From angular email validator
// https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!EMAIL_REGEXP.test(email)) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    registerToNewsletter(email);

    res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;
