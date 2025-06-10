import { useContext } from 'react';
import { I18nContext, LOCALES } from '@/libs/i18n';
import { GlobeIcon } from 'lucide-react';

export const LanguageSelect = () => {
  const { locale, setLocale } = useContext(I18nContext);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div className="flex items-center p-2 border border-gray-500 rounded-md bg-background">
        <GlobeIcon className="w-4 h-4 mx-1" />

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
