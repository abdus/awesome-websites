import fs from 'fs';
import lunr from 'lunr';
import { urlModel } from '@/config/db';

const INDEX_PATH = `.search-index.json`;

export async function buildSearchIndex(): Promise<lunr.Index> {
  try {
    const docs = await urlModel?.find();
    const index = lunr((builder) => {
      builder.ref(`_id`);

      builder.field(`url`);
      builder.field(`title`);
      builder.field(`description`);

      for (let i = 0; i < docs.length; i++) {
        const d = docs[i];
        builder.add(d);
      }
    });

    return index;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function saveSearchIndex(index: lunr.Index) {
  try {
    fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2), {
      encoding: `utf-8`,
    });
  } catch (err) {
    console.log(err);
  }
}

export function loadSearchIndex(): lunr.Index {
  try {
    const content = fs.readFileSync(INDEX_PATH, {
      encoding: `utf-8`,
    });

    return lunr.Index.load(JSON.parse(content));
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function deleteSearchIndexFile() {
  return fs.unlinkSync(INDEX_PATH);
}

export function hasSearchIndex() {
  return fs.existsSync(INDEX_PATH);
}
