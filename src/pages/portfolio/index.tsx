import LinkText from '@/components/Elements/LinkText';
import { Heading } from '@/components/Typography/Heading';
import { useTranslation } from '@/libs/i18n';
import Head from 'next/head';

type Project = {
  title: string;
  description: string;
  link: string;
  archived: boolean;
  tags: string[];
};

const Archived = () => {
  return <span className="text-red-500 text-sm ml-2">(archived)</span>;
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="grid grid-rows-[auto,1fr,auto] h-[220px] rounded-sm p-4 overflow-hidden"
      style={{
        backgroundColor: '#2c2c2c',
      }}
    >
      <h2 className="text-2xl mb-1 text-white break-all">
        {project.title}
        {project.archived && <Archived />}
      </h2>
      <p className="text-sm mb-2 overflow-auto">{project.description}</p>
      <LinkText
        href={project.link}
        className="text-primary-500 hover:text-primary-600"
      >
        VIEW
      </LinkText>
    </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects && projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </>
  );
}
