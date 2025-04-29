import 'react-quill-new/dist/quill.snow.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GNB from '@/components/common/GNB';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <GNB />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
