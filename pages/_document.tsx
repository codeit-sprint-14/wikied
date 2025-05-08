// pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet(); // 스타일 시트 생성
    const originalRenderPage = ctx.renderPage;

    try {
      // 앱/페이지 렌더링 시 스타일 시트가 스타일을 수집하도록 함
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        // 기존 스타일에 수집된 스타일 추가
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()} {/* 수집된 스타일 태그 반환 */}
          </>
        ),
      };
    } finally {
      sheet.seal(); // 스타일 시트 사용 종료
    }
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
