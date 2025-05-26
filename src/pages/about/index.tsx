import {
  SkillArea,
  ExperienceArea,
  AffiliationArea,
} from '@/components/Pages/About';
import { useTranslation } from '@/libs/i18n';
import Head from 'next/head';

export default function About() {
  const { t } = useTranslation('pages.about');

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
      </Head>
      <ExperienceArea />
      <div className="h-16" />
      <AffiliationArea />
      <div className="h-12" />
      <SkillArea />
    </>
  );
}
