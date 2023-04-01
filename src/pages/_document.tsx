import { styled } from '@mui/material'
import { Html, Head, Main, NextScript } from 'next/document'

const Body = styled('body')({
  overflowY: 'scroll',
})

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <Body>
        <Main />
        <NextScript />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZJ7C2QM9W7"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZJ7C2QM9W7');
          `
        }}></script>
      </Body>
    </Html>
  )
}
