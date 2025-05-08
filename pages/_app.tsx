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
