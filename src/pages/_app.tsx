import { AppProps } from 'next/app';
import '@/styles/global.css';
import '@fontsource/poppins/400.css';
import { HtmlHead } from '@/components/html-head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HtmlHead />
      <Component {...pageProps} />
    </>
  );
}
