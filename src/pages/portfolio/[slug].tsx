import { Heading } from '@/components/Typography/Heading';
import { Body } from '@/components/Typography/Body';
import { useTranslation } from '@/libs/i18n';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

type Project = {
  title: string;
  slug: string;
  description: string;
  detailDescription: string;
  link: string;
  archived: boolean;
  tags: string[];
  technologies: string[];
  images: string[];
};

const Archived = () => {
  return (
    <span className="bg-red-800 text-red-100 text-xs px-2 py-0.5 rounded ml-2">
      Archived
    </span>
  );
};

export default function ProjectDetail() {
  const { t } = useTranslation('pages.portfolio');
  const router = useRouter();
  const { slug } = router.query;

  const projects = t<Project[]>('projects', { returnObjects: true });
  const project = projects?.find((p) => p.slug === slug);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <Head>
        <title>{`${project.title} | K@zuki.`}</title>
        <meta name="description" content={project.detailDescription} />
        <meta name="keywords" content={project.tags.join(', ')} />
      </Head>

      <div className="max-w-4xl mx-auto">
        <Link
          href="/portfolio"
          className="text-blue-400 hover:text-blue-300 mb-6 inline-block"
        >
          {t('detail.backToPortfolio')}
        </Link>

        <div className="mb-8">
          <Heading className="mb-4">
            {project.title}
            {project.archived && <Archived />}
          </Heading>

          {project.detailDescription && (
            <Body className="text-lg mb-6">{project.detailDescription}</Body>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {t('detail.technologies')}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-700 text-gray-100 px-3 py-1 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {t('detail.tags')}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-600 text-blue-100 px-3 py-1 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {project.link && (
            <div className="mt-8">
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                {t('detail.viewProject')}
                <svg
                  className="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Import locale data for path generation
  const enLocale = await import('@/locales/en.json');
  const jaLocale = await import('@/locales/ja.json');

  const enProjects = enLocale.default.pages.portfolio.projects;
  const jaProjects = jaLocale.default.pages.portfolio.projects;

  const paths: { params: { slug: string } }[] = [];
  const slugSet = new Set<string>();

  // Collect all unique slugs from both locales
  [...enProjects, ...jaProjects].forEach((project) => {
    if (!project.slug) {
      console.warn(`Project "${project.title}" is missing slug`);
      return;
    }
    slugSet.add(project.slug);
  });

  // Generate paths for each unique slug
  slugSet.forEach((slug) => {
    paths.push({
      params: { slug },
    });
  });

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
