import { Heading } from '@/components/Typography';
import { useTranslation } from '@/libs/i18n';
import React from 'react';

type Certification = {
  name: string;
  date: string;
};

export const CertificationArea = () => {
  const { t } = useTranslation('pages.about.certification');
  const certifications = t('certifications', {
    returnObjects: true,
  }) as Certification[];

  return (
    <>
      <Heading>{t('title')}</Heading>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="px-4 py-2 text-left">{t('thead.name')}</th>
            <th className="px-4 py-2 text-right">{t('thead.date')}</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((certification) => (
            <tr key={certification.name} className="border-b border-gray-600">
              <td className="px-4 py-2">{certification.name}</td>
              <td className="px-4 py-2 text-right">{certification.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
