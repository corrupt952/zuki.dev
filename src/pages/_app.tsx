import { MainLayout } from "@/components/Layout";
import { Config } from "@/config";
import { I18nApp } from "@/libs/i18n";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{Config.title}</title>
        <meta name="description" content={Config.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

export default I18nApp(App);
