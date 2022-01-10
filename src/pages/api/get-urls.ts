import lunr from 'lunr';
import mongoose from 'mongoose';
import { urlModel } from '@/config/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  hasSearchIndex,
  saveSearchIndex,
  loadSearchIndex,
  buildSearchIndex,
} from '@/config/search';

type Data = {
  ok: boolean;
  data: any;
  error: string | null;
};

let searchIndex: lunr.Index;
let indexBuiltAt: Date;
const TEN_MIN_IN_MILI = 600000;

function createSearchIndex() {
  buildSearchIndex()
    .then((index) => {
      searchIndex = index;
      saveSearchIndex(index);
      indexBuiltAt = new Date();
    })
    .catch(console.log);
}

setImmediate(() => {
  if (hasSearchIndex()) {
    searchIndex = loadSearchIndex();
  } else {
    createSearchIndex();
  }

  setInterval(() => {
    // reload search index at every 10 mins
    if (
      indexBuiltAt &&
      indexBuiltAt?.getTime() + TEN_MIN_IN_MILI < new Date().getTime()
    ) {
      if (hasSearchIndex()) {
        searchIndex = loadSearchIndex();
      } else {
        createSearchIndex();
      }
    }
  }, 30 * 1000);
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const search = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;

    if (search && searchIndex) {
      const ids = [];
      const result = searchIndex.search(`*${search.split(` `).join(`*`)}*`);

      if (!result) return res.json({ ok: true, data: [], error: null });

      for (let i = 0; i < result.length; i++) {
        const doc = result[i];
        mongoose.isValidObjectId(doc.ref) && ids.push(doc.ref);
      }

      const docs = await urlModel?.find({ _id: { $in: ids } });
      res.json({ ok: true, data: docs, error: null });
    } else {
      const docs = await urlModel?.find();
      res.json({ ok: true, data: docs, error: null });
    }
  } catch (err) {
    console.log(err);
    return res.json({ ok: true, data: null, error: `internal server error` });
  }
}
