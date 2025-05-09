import 'react-quill-new/dist/quill.snow.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GNB from '@/components/common/GNB';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>위키드: 너의 TMI, 내가 정리해줌</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wikied-steel.vercel.app" />
        <meta property="og:title" content="위키드: 너의 TMI, 내가 정리해줌" />
        <meta property="og:description" content="친구들과 함께 만드는 우리만의 인물 백과사전" />
        <meta property="og:image" content="https://wikied-steel.vercel.app/images/img-meta.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="viewport"
          content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;"
        />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <GNB />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
