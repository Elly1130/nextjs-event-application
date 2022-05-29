import Head from 'next/head';

import GlobalStyle from '../components/GlobalStyle';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyle />
      <Head>
        <title>Next Events</title>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Open+Sans:wght@400;700&display=swap'
        ></link>
        <meta name='description' content='NextJS Events' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
