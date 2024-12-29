import { LanguageSelect } from '@/components/Elements/LanguageSelect';
import { Footer } from '@/components/Layout/Footer';
import { Header } from '@/components/Layout/Header';
import { I18nApp } from '@/libs/i18n';
import { Config } from '@/config';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

export const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${Config.analytics.google.id}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${Config.analytics.google.id}');
        `,
        }}
      />
    </>
  );
};

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouterChange = (url: string) => {
      const { gtag } = window as any;
      gtag('config', Config.analytics.google.id, {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouterChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{Config.title}</title>
        <meta name="description" content={Config.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="w-auto md:w-3/5 mx-4 md:mx-auto my-12">
        <Component {...pageProps} />
      </main>
      <Footer />
      <LanguageSelect />
      <GoogleAnalytics />
    </>
  );
}

export default I18nApp(App);
