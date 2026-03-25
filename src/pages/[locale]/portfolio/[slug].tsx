import { GetStaticPaths, GetStaticProps } from 'next';
import ProjectDetail from '@/pages/portfolio/[slug]';
import { LOCALES } from '@/libs/i18n';

export const getStaticPaths: GetStaticPaths = async () => {
  const enLocale = await import('@/locales/en.json');
  const jaLocale = await import('@/locales/ja.json');

  const enProjects = enLocale.default.pages.portfolio.projects;
  const jaProjects = jaLocale.default.pages.portfolio.projects;

  const slugSet = new Set<string>();
  [...enProjects, ...jaProjects].forEach((project) => {
    if (!project.slug) {
      console.warn(`Project "${project.title}" is missing slug`);
      return;
    }
    slugSet.add(project.slug);
  });

  const paths: { params: { locale: string; slug: string } }[] = [];
  for (const locale of LOCALES) {
    slugSet.forEach((slug) => {
      paths.push({ params: { locale, slug } });
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default ProjectDetail;
