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
  const parsedBody = JSON.parse(req.body);

  const url = parsedBody.url;
  const title = parsedBody.title;
  const favicon = parsedBody.favicon;
  const description = parsedBody.description;

  if (!url || typeof url !== `string`) {
    return res
      .status(400)
      .json({ ok: false, data: null, error: `You must provide a valid URL` });
  }

  if (!url) {
    return res
      .status(400)
      .json({ ok: false, data: null, error: `You must provide a Title` });
  }

  if (typeof favicon !== `string`) {
    return res
      .status(400)
      .json({ ok: false, data: null, error: `field Favicon must be a URL` });
  }

  if (typeof description !== `string`) {
    return res.status(400).json({
      ok: false,
      data: null,
      error: `field Description must be a String`,
    });
  }

  try {
    new URL(favicon);
  } catch (err) {
    return res
      .status(400)
      .json({ ok: false, data: null, error: `field Favicon must be a URL` });
  }

  try {
    new URL(url);
  } catch (err) {
    return res
      .status(400)
      .json({ ok: false, data: null, error: `field url must be a URL` });
  }

  // save to database
  try {
    const doc2save = new urlModel({ url, favicon, description, title });
    const docSaved = await doc2save.save();

    return res.json({ ok: true, data: docSaved, error: null });
  } catch (err) {
    const error = err as Error;

    if (error.message.includes(`duplicate key`)) {
      return res.status(400).json({
        ok: false,
        data: null,
        error: `Looks like '${
          new URL(url).host
        }' already exists in the directory.`,
      });
    }

    return res
      .status(500)
      .json({ ok: false, data: null, error: `internal server error` });
  }
}
