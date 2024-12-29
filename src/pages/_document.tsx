import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body className="min-h-screen overflow-y-scroll text-foreground bg-background text-base md:text-lg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
