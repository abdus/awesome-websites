import { AppProps } from 'next/app';
import '@/styles/global.css';
import '@fontsource/poppins/400.css';
import { HtmlHead } from '@/components/html-head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HtmlHead />

      <div style={{ minHeight: `80vh` }}>
        <Component {...pageProps} />
      </div>

      <footer
        style={{
          maxWidth: `1000px`,
          margin: `2rem auto`,
          padding: `0 1rem`,
          color: `gray`,
          fontSize: `0.8em`,
        }}
      >
        &copy; 2020. A fun little project by{` `}
        <a href="https://abdus.net" style={{ textDecoration: `underline` }}>
          Abdus Azad
        </a>
        .
      </footer>
    </>
  );
}
