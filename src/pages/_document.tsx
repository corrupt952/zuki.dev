import { styled } from "@mui/material";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Body = styled("body")({
  overflowY: "scroll",
});

export const GoogleAnalytics = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZJ7C2QM9W7"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`

          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZJ7C2QM9W7');
          `}
      </Script>
    </>
  );
};

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <Body>
        <Main />
        <NextScript />
      </Body>
    </Html>
  );
}
