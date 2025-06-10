import { GetStaticPaths, GetStaticProps } from 'next';
import ProjectDetail from '@/pages/portfolio/[slug]';

export const getStaticPaths: GetStaticPaths = async () => {
  // Import locale data for all locales
  const jaLocale = await import('@/locales/ja.json');
  const enLocale = await import('@/locales/en.json');

  const jaProjects = jaLocale.default.pages.portfolio.projects;
  const locales = ['en', 'ja'];

  const paths = [];

  // Generate paths for each locale and project
  for (const locale of locales) {
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
