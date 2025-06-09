import { Heading } from '@/components/Typography/Heading';
import { useTranslation } from '@/libs/i18n';
import Head from 'next/head';
import Link from 'next/link';

type Project = {
  title: string;
  description: string;
  link: string;
  archived: boolean;
  tags: string[];
};

const Archived = () => {
  return <span className="bg-red-800 text-red-100 text-xs px-2 py-0.5 rounded ml-2">Archived</span>;
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.link}
      className="block"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="grid grid-rows-[auto,1fr] h-[160px] rounded-lg p-6 overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-200"
        style={{
          backgroundColor: '#2c2c2c',
        }}
      >
        <h2 className="text-2xl mb-1 text-white break-all">
          {project.title}
          {project.archived && <Archived />}
        </h2>
        <p className="text-sm overflow-hidden">{project.description}</p>
      </div>
    </Link>
  );
}

export default function Portfolio() {
  const { t } = useTranslation('pages.portfolio');
  const projects = t('projects', {
    returnObjects: true,
  }) as Project[];

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
      </Head>
      <Heading>{t('title')}</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects && projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </>
  );
}
