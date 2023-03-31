import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MainLayout } from '@/components/Layout'
import { Config } from '@/config'

export default function App({ Component, pageProps }: AppProps) {
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
  )
}
