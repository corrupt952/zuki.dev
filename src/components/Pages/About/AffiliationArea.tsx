import { Heading } from '@/components/Typography/Heading';
import { useTranslation } from '@/libs/i18n';

type Affiliation = {
  name: string;
  date: string;
  role: string;
};

export const AffiliationArea = () => {
  const { t } = useTranslation('pages.about.affiliation');
  const affiliations = t('affiliations', {
    returnObjects: true,
  }) as Affiliation[];

  return (
    <>
      <Heading>{t('title')}</Heading>
      <div className="h-8" />
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="px-4 py-2 text-left">{t('thead.name')}</th>
            <th className="px-4 py-2 text-left">{t('thead.role')}</th>
            <th className="px-4 py-2 text-left">{t('thead.date')}</th>
          </tr>
        </thead>
        <tbody>
          {affiliations.map((affiliation) => (
            <tr key={affiliation.name} className="border-b border-gray-600">
              <td className="px-4 py-2">
                {affiliation.date.endsWith('~') && (
                  <span className="mr-2">🔵</span>
                )}
                {affiliation.name}
              </td>
              <td className="px-4 py-2">{affiliation.role}</td>
              <td className="px-4 py-2">{affiliation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
