import { AppProps } from 'next/app';
import getConfig from 'next/config';
import React from 'react';

type Dict = {
  [key: string]: string | string[] | Dict | Dict[] | null;
};

const publicRuntimeConfig = getConfig().publicRuntimeConfig;
const i18n = publicRuntimeConfig.i18n;
export const DEFAULT_LOCALE = i18n.defaultLocale;
export const LOCALES = i18n.locales;
const messages: Dict = {};
LOCALES.forEach((locale: string) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  messages[locale] = require(`@/locales/${locale}.json`);
});

const isDict = (dict: unknown) => {
  return (
    dict &&
    typeof dict === 'object' &&
    dict !== null &&
    typeof (dict as Dict).length === 'undefined'
  );
};

export const I18nContext = React.createContext({
  locale: DEFAULT_LOCALE,
  setLocale: (locale: string) => {},
});
export const I18nApp = <Props extends AppProps>(
  WrappedComponent: React.ComponentType<Props>,
) => {
  const With = (props: Props) => {
    const { router } = props;
    let uriLocale: string | null = router.asPath.split('/')[1];
    if (LOCALES.indexOf(uriLocale) === -1) uriLocale = null;
    let initialLocale = uriLocale || router.locale || DEFAULT_LOCALE;
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
    paths: LOCALES.map((locale: string) => ({
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

type i18nProps = {
  returnObjects?: boolean;
};

export const useTranslation = (namespace?: string, option?: i18nProps) => {
  const { locale, setLocale } = React.useContext(I18nContext);

  return {
    locale,
    setLocale,
    t: (key: string, option?: i18nProps) => {
      const k = !namespace ? key : `${namespace}.${key}`;
      const message = k.split('.').reduce((dict: any, k: string) => {
        if (!dict) {
          console.warn(`[i18n] ${k} is not found in ${locale}.json`);
          return false;
        }
        if (!isDict(dict)) return dict;

        if (!(k in (dict as Dict))) {
          console.warn(`[i18n] ${k} is not found in ${locale}.json`);
          return false;
        }

        return (dict as Dict)[k];
      }, messages[locale]);

      if (typeof message === 'string') return message;
      if (option?.returnObjects) return message || k;
      return <>{message || k}</>;
    },
  };
};
