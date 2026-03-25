import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { LOCALES, DEFAULT_LOCALE } from '@/libs/i18n';

type MyDocumentProps = DocumentInitialProps & {
  locale: string;
};

function resolveLocale(ctx: DocumentContext): string {
  // ctx.query contains route params (e.g. { locale: 'ja' }) during both
  // dev server rendering and static export build.
  const queryLocale = ctx.query?.locale;
  if (
    typeof queryLocale === 'string' &&
    LOCALES.includes(queryLocale as (typeof LOCALES)[number])
  ) {
    return queryLocale;
  }

  // Fallback: parse the resolved path for cases where query is empty.
  const pathSegment = (ctx.asPath || '/').split('/')[1];
  if (LOCALES.includes(pathSegment as (typeof LOCALES)[number])) {
    return pathSegment;
  }

  return DEFAULT_LOCALE;
}

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: resolveLocale(ctx) };
  }

  render() {
    return (
      <Html lang={this.props.locale}>
        <Head />
        <body className="min-h-screen overflow-y-scroll text-foreground bg-background text-base md:text-lg">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
