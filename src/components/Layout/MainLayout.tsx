import React, { useContext } from 'react';
import { Content } from './Content';
import { Footer } from './Footer';
import { Header } from './Header';
import { I18nContext, LOCALES } from '@/libs/i18n';
import { GlobeIcon } from 'lucide-react';

const LanguageSelect = () => {
  const { locale, setLocale } = useContext(I18nContext);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div className="flex items-center p-2 border rounded-sm bg-background">
        <GlobeIcon className="w-4 h-4 mr-2" />
        <select
          value={locale}
          className="border-none outline-none bg-background"
          onChange={handleChange}
        >
          {LOCALES.map((locale: string) => (
            <option key={locale} value={locale}>
              {locale.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Content>{children}</Content>
      <Footer />
      <LanguageSelect />
    </div>
  );
};
