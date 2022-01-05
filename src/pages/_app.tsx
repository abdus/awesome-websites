import { AppProps } from 'next/app';
import '@/styles/global.css';
import '@fontsource/poppins/400.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
