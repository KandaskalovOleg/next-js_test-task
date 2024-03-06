import '../styles/global.css';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import LoaderProvider from '../context/LoaderContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoaderProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LoaderProvider>
  );
};
