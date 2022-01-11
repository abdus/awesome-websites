import React from 'react';
import styles from '@/styles/Submit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

interface UrlInfo {
  url: string;
  icon: string;
  title: string;
  description: string;
}

export default function Submit() {
  const [errorMsg, setErrorMsg] = React.useState(``);
  const [urlInfo, setURLInfo] = React.useState<UrlInfo>();
  const [loadingUrlInfo, setLoadingUrlInfo] = React.useState(false);
  const [awaitingSaveResp, setAwaitingSaveResp] = React.useState(false);

  return (
    <div className="max-width">
      <div className={styles.nav}>
        <div>
          <h2 className={styles.title}>ADD NEW</h2>
          <div className={styles.desc}>Add a cool domain to the directory!</div>
        </div>

        {/*eslint-disable-next-line*/}
        <a href="/">
          <FontAwesomeIcon icon={faArrowLeftLong} fontSize="1.3em" />
        </a>
      </div>

      {errorMsg && (
        <div
          style={{
            color: `#6c0f0f`,
            padding: `1rem`,
            marginTop: `2rem`,
            borderRadius: `0.3rem`,
            backgroundColor: `#e6caca`,
            border: `1px solid #e6caca`,
          }}
        >
          Error: {errorMsg}
        </div>
      )}

      {!urlInfo && (
        <form
          className={styles.form}
          onSubmit={async (ev) => {
            setErrorMsg(``);
            ev.preventDefault();
            setLoadingUrlInfo(true);

            const form = ev.currentTarget;
            const formData = new FormData(form);
            let url = formData.get(`url`) as string;

            if (!url?.startsWith(`https`)) {
              url = `https://${url}`;
            }

            try {
              const raw = await fetch(`/api/get-url-info?url=${btoa(url)}`);

              if (!raw.ok) {
                throw Error(`Could not fetch the URL information`);
              }

              const json = await raw.json();

              if (json.ok) {
                setURLInfo(json.data);
                setLoadingUrlInfo(() => false);
              } else {
                setErrorMsg(json.error);
              }
            } catch (err) {
              setLoadingUrlInfo(() => false);
              setErrorMsg((err as Error).message);
            }
          }}
        >
          <div className={styles.form_group}>
            <input
              type="url"
              name="url"
              required={true}
              style={{ width: `100%` }}
              placeholder="https://www.some-website.com"
            />
            <button type="submit">
              {loadingUrlInfo ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                <FontAwesomeIcon icon={faCircleCheck} />
              )}
            </button>
          </div>
        </form>
      )}

      {urlInfo && (
        <form
          className={styles.form}
          onSubmit={async (ev) => {
            setErrorMsg(``);
            ev.preventDefault();
            setAwaitingSaveResp(true);

            const form = ev.currentTarget;
            const formData = new FormData(form);

            try {
              const raw = await fetch(`/api/save-url`, {
                method: `POST`,
                body: JSON.stringify({
                  url: urlInfo?.url,
                  title: formData.get(`url-title`),
                  favicon: formData.get(`favicon`),
                  description: formData.get(`desc`),
                }),
              });

              const resp = await raw.json();
              !resp.ok && setErrorMsg(resp.error);

              setAwaitingSaveResp(false);
              window.location.href = `/`;
            } catch (err) {
              setAwaitingSaveResp(false);
              setErrorMsg((err as Error).message);
            }
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
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <button style={{ width: `49%` }} type="submit">
              {awaitingSaveResp ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                <FontAwesomeIcon icon={faCircleCheck} />
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
