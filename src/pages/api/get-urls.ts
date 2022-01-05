import { urlModel } from '@/config/db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  data: any;
  error: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const docs = await urlModel?.find();
    res.json({ ok: true, data: docs, error: null });
  } catch (err) {
    console.log(err);
    return res.json({ ok: true, data: null, error: `internal server error` });
  }
}
