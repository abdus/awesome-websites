import React from 'react';
import styles from '@/styles/Submit.module.css';
import BackCircle from '@/assets/arrow-left-circle.svg';

interface UrlInfo {
  url: string;
  icon: string;
  title: string;
  description: string;
}

export default function Submit() {
  const [urlInfo, setURLInfo] = React.useState<UrlInfo>();

  return (
    <div className="max-width">
      <div className={styles.nav}>
        <div>
          <h2 className={styles.title}>ADD NEW</h2>
          <div className={styles.desc}>Add a cool domain to the directory!</div>
        </div>

        {/*eslint-disable-next-line*/}
        <a href="/">
          <BackCircle />
        </a>
      </div>

      {!urlInfo && (
        <form
          className={styles.form}
          onSubmit={async (ev) => {
            ev.preventDefault();

            const form = ev.currentTarget;
            const formData = new FormData(form);
            let url = formData.get(`url`) as string;

            if (!url?.startsWith(`https`)) {
              url = `https://${url}`;
            }

            try {
              const raw = await fetch(`/api/get-url-info?url=${btoa(url)}`);

              if (!raw.ok) {
                throw Error(`something went wrong while fetching data`);
              }

              const json = await raw.json();

              if (json.ok) {
                setURLInfo(json.data);
              } else {
                throw Error(json.error);
              }
            } catch (err) {}
          }}
        >
          <div className={styles.form_group}>
            <input
              type="url"
              name="url"
              style={{ width: `100%` }}
              placeholder="https://www.some-website.com"
            />
            <button type="submit">-&gt;</button>
          </div>
        </form>
      )}

      {urlInfo && (
        <form
          className={styles.form}
          onSubmit={async (ev) => {
            ev.preventDefault();

            const form = ev.currentTarget;
            const formData = new FormData(form);

            const raw = await fetch(`/api/save-url`, {
              method: `POST`,
              body: JSON.stringify({
                url: urlInfo?.url,
                title: formData.get(`url-title`),
                favicon: formData.get(`favicon`),
                description: formData.get(`desc`),
              }),
            });

            const json = await raw.json();
            console.log(json);
          }}
        >
          <label>
            <small>TITLE</small>
            <input type="text" defaultValue={urlInfo?.title} name="url-title" />
          </label>

          <label>
            <small>DESCRIPTION</small>
            <textarea
              defaultValue={urlInfo?.description}
              name="desc"
              rows={3}
            ></textarea>
          </label>

          <label>
            <small>FAVICON</small>
            <input type="url" defaultValue={urlInfo?.icon} name="favicon" />
          </label>

          <label>
            <small>URL</small>
            <input
              type="url"
              disabled
              readOnly
              value={urlInfo?.url}
              name="url-href"
            />
          </label>

          <div
            className={styles.form_group}
            style={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: `center`,
            }}
          >
            <button
              type="reset"
              style={{ width: `49%` }}
              onClick={() => setURLInfo(undefined)}
            >
              RESET
            </button>
            <button style={{ width: `49%` }} type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
