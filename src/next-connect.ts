import { NextApiRequest, NextApiResponse } from 'next';
import nc, { NextConnect } from 'next-connect';

const nextConnect = (): NextConnect<NextApiRequest, NextApiResponse> => {
  return nc<NextApiRequest, NextApiResponse>({
    onError(error: unknown, req: NextApiRequest, res: NextApiResponse) {
      console.error(
        `Error ${req.method}: ${req.url}, body: ${JSON.stringify(req.body)}`
      );
      console.error(error);
      res.status(500).json({ message: `Something went wrong.` });
    },
    onNoMatch(_req: NextApiRequest, res: NextApiResponse) {
      res.status(405).json({ message: `Method Not Allowed` });
    }
  });
};

export default nextConnect;
