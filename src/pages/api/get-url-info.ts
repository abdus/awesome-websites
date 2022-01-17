import cheerio from 'cheerio';
import { fetch } from 'fetch-h2';
import { isUrlBanned } from '@/config/banned-hostnames';
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
  const base64url = req.query.url;

  if (!base64url || typeof base64url !== `string`) {
    return res
      .status(400)
      .json({ ok: false, data: null, error: `expected url param` });
  }

  try {
    const url = Buffer.from(base64url, `base64`).toString(`ascii`);

    if (!url) throw Error(`invalid url parameter`);

    // check if the URL is correctly formed
    const urlObj = new URL(url);
    const hostName = urlObj.host;

    if (isUrlBanned(hostName)) {
      return res.json({
        ok: false,
        data: null,
        error: `'${hostName}' is not allowed`,
      });
    }

    const raw = await fetch(url, { method: `GET`, redirect: `follow` });
    const html = await raw.text(false);
    const select = cheerio.load(html);
    const htmlDesc = select(`meta[name='description']`).attr(`content`);
    const htmlTitle =
      select(`title`).text() || select(`meta[name='title']`).attr(`content`);
    const htmlFavicon = new URL(
      select(`link[rel='icon']`).attr(`href`) ||
        select(`link[rel='shortcut icon']`).attr(`href`) ||
        `/favicon.ico`,
      url,
    );

    return res.json({
      ok: true,
      error: null,
      data: { title: htmlTitle, url, description: htmlDesc, icon: htmlFavicon },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ data: null, error: (err as Error).message, ok: false });
  }
}
