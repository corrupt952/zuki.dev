import { AppProps } from 'next/app';
import React from 'react';
import enMessages from '@/locales/en.json';
import jaMessages from '@/locales/ja.json';

export const LOCALES = ['ja', 'en'] as const;
export const DEFAULT_LOCALE = 'en';

const messages = {
  en: enMessages,
  ja: jaMessages,
};

type Locale = keyof typeof messages;

const isLocale = (value: string): value is Locale => {
  return value in messages;
};

const getMessages = (locale: string) => {
  if (isLocale(locale)) {
    return messages[locale];
  }
  return messages[DEFAULT_LOCALE];
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

export const I18nContext = React.createContext({
  locale: DEFAULT_LOCALE,
  setLocale: (_locale: string) => {},
});

export const I18nApp = <Props extends AppProps>(
  WrappedComponent: React.ComponentType<Props>,
) => {
  const With = (props: Props) => {
    const { router } = props;
    let uriLocale: string | null = router.asPath.split('/')[1];
    if (!LOCALES.includes(uriLocale as (typeof LOCALES)[number]))
      uriLocale = null;
    const initialLocale = uriLocale || router.locale || DEFAULT_LOCALE;
    const [locale, setLocale] = React.useState<string>(initialLocale);

    const setLocaleWithRouter = (locale: string) => {
      const { router } = props;
      if (router.asPath.startsWith(`/${locale}/`)) return;

      setLocale(locale);
      let pathname = router.pathname || '/';
      let asName = router.asPath || '/';
      if (locale === DEFAULT_LOCALE) {
        pathname = router.pathname.replace('/[locale]', '');
        pathname = pathname === '' ? '/' : pathname;
        asName = router.asPath.replace(/^\/[a-zA-Z0-9]+/i, '');
      } else {
        pathname = '/[locale]' + router.pathname;
        asName = `/${locale}${router.asPath}`;
      }
      props.router.push(pathname, asName, { locale });
    };

    return (
      <I18nContext.Provider value={{ locale, setLocale: setLocaleWithRouter }}>
        <WrappedComponent {...props} />
      </I18nContext.Provider>
    );
  };
  return With;
};

export const GetStaticPaths = async () => {
  return {
    paths: LOCALES.map((locale) => ({
      params: { locale },
    })),
    fallback: true,
  };
};

export const GetStaticProps = async ({
  params,
}: {
  params: { [key: string]: string };
}) => {
  return {
    props: {
      locale: params.locale || DEFAULT_LOCALE,
    },
  };
};

export const useTranslation = (namespace?: string) => {
  const { locale, setLocale } = React.useContext(I18nContext);

  function t(key: string): string;
  function t<T>(key: string, option: { returnObjects: true }): T;
  function t(
    key: string,
    option?: { returnObjects?: boolean },
  ): string | unknown {
    const k = !namespace ? key : `${namespace}.${key}`;
    const message = k.split('.').reduce<unknown>((current, key) => {
      if (!isRecord(current)) {
        console.warn(`[i18n] ${key} is not found in ${locale}.json`);
        return undefined;
      }
      if (!(key in current)) {
        console.warn(`[i18n] ${key} is not found in ${locale}.json`);
        return undefined;
      }
      return current[key];
    }, getMessages(locale));

    if (option?.returnObjects) return message ?? k;
    return typeof message === 'string' ? message : String(message ?? k);
  }

  return { locale, setLocale, t };
};
