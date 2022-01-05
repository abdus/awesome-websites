import React from 'react';
import { fetch } from 'fetch-h2';
import { GetServerSideProps } from 'next';
import Favicon from '@/assets/favicon.jpg';
import absoluteUrl from 'next-absolute-url';
import styles from '@/styles/Home.module.css';
import PlusCircle from '@/assets/plus-circle.svg';

export default function Home(props: { urls: null | any[] }) {
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
            <PlusCircle />
          </a>
        </div>

        <div className={styles.links}>
          {props.urls?.map((item) => (
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
                    ev.currentTarget.src = Favicon.src;
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
    const raw = await fetch(`${origin}/api/get-urls`);
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
