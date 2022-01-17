import React from 'react';
import { fetch } from 'fetch-h2';
import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import styles from '@/styles/Home.module.css';
import { NotFound } from '@/components/not-found';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IDebounce {
  cb(): void;
  timeout?: number;
}

const debounce = (function _debounce() {
  let timer: ReturnType<typeof setTimeout>;
  return (opts: IDebounce) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      opts.cb.apply(null);
    }, opts.timeout || 400);
  };
})();

export default function Home(props: { urls: null | any[] }) {
  const [urls, setUrls] = React.useState(props.urls);
  const [searchQuery, setSearchQuery] = React.useState(``);

  React.useEffect(() => {
    const searchParam = window.location.search;
    const urlSearchQuery = new URLSearchParams(searchParam).get(`q`);

    urlSearchQuery && setSearchQuery(urlSearchQuery);
  }, []);

  React.useEffect(() => {
    setUrls(props.urls);
  }, [props.urls]);

  React.useEffect(() => {
    debounce({
      cb: async () => {
        try {
          const raw = await window.fetch(`/api/get-urls?q=${searchQuery}`);
          const json = await raw.json();
          setUrls(json.data);
        } catch (err) {}
      },
    });
  }, [searchQuery]);

  return (
    <>
      <div className="max-width">
        <div className={styles.nav}>
          <div>
            <h2 className={styles.title}>AWESOME WEBSITES</h2>
            <div className={styles.desc}>
              A list of amazing useful websites.
            </div>
          </div>

          {/*eslint-disable-next-line*/}
          <a href="/submit">
            <FontAwesomeIcon icon={faPlus} fontSize="1.3em" />
          </a>
        </div>

        <div className={styles.search_wrapper}>
          <input
            type="search"
            value={searchQuery}
            placeholder="search something..."
            onChange={(ev) => setSearchQuery(ev.currentTarget.value)}
          />
        </div>

        {Array.isArray(urls) && urls.length === 0 ? <NotFound /> : null}

        <div className={styles.links}>
          {urls?.map((item) => (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={styles.card}
              key={item._id}
            >
              <section>
                {/*eslint-disable-next-line*/}
                <img
                  src={item.favicon}
                  alt={item.title}
                  className={styles.favicon_img}
                  onError={(ev) => {
                    ev.currentTarget.src = `/logo.svg`;
                  }}
                />
              </section>
              <section>
                <div className={styles.header}>
                  <div className={styles.link_title}>{item.title}</div>
                  <small className={styles.link_url}>
                    {new URL(item.url).host}
                  </small>
                </div>

                <div className={styles.body}>
                  <small style={{ color: `gray` }}>{item.description}</small>
                </div>
              </section>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin } = absoluteUrl(context.req, `localhost:3000`);

  try {
    const raw = await fetch(`${origin}/api/get-urls?q=${context.query.q}`);
    const json = await raw.json();

    if (!json.ok) {
      throw Error(`something went wrong: ` + json.error);
    }

    return {
      props: {
        urls: json.data,
      },
    };
  } catch (err) {
    return {
      props: {
        urls: null,
      },
    };
  }
};
