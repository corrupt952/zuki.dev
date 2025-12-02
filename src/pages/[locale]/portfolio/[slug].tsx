import { GetStaticPaths, GetStaticProps } from 'next';
import ProjectDetail from '@/pages/portfolio/[slug]';
import { LOCALES } from '@/libs/i18n';

export const getStaticPaths: GetStaticPaths = async () => {
  const jaLocale = await import('@/locales/ja.json');
  const jaProjects = jaLocale.default.pages.portfolio.projects;

  const paths = [];

  for (const locale of LOCALES) {
    for (const project of jaProjects) {
      // Skip projects without slug
      if (!project.slug) {
        console.warn(`Project "${project.title}" is missing slug`);
        continue;
      }

      paths.push({
        params: {
          locale,
          slug: project.slug,
        },
      });
    }
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
