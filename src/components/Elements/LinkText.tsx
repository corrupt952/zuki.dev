import { DEFAULT_LOCALE, I18nContext } from '@/libs/i18n';
import Link, { LinkProps } from 'next/link';
import React, { useContext } from 'react';

type LinkTextProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function LinkText({ children, ...props }: LinkTextProps) {
  const { locale } = useContext(I18nContext);
  let uri = props.href || '';
  if (uri.startsWith('/')) {
    uri = locale === DEFAULT_LOCALE ? uri : `/${locale}${uri}`;
  }
  const isExternal = props.href?.startsWith('http');

  return (
    <Link
      {...props}
      className={`text-decoration-none hover:underline ${props.className}`}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
}
