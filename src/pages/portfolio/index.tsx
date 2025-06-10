import { Heading } from '@/components/Typography/Heading';
import { useTranslation } from '@/libs/i18n';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useMemo, useCallback, useEffect } from 'react';

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

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="block">
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
  const { t, locale } = useTranslation('pages.portfolio');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const projectsData = t('projects', {
    returnObjects: true,
  });

  const projects = projectsData as Project[] | null;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (!projects || !Array.isArray(projects)) {
      return [];
    }

    return projects.filter((project) => {
      // Filter by archived status
      if (!showArchived && project.archived) {
        return false;
      }

      // Filter by search query
      if (debouncedSearchQuery) {
        const query = debouncedSearchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDescription = project.description
          .toLowerCase()
          .includes(query);
        const matchesDetailDescription = project.detailDescription
          ?.toLowerCase()
          .includes(query);

        if (!matchesTitle && !matchesDescription && !matchesDetailDescription) {
          return false;
        }
      }

      // Filter by selected tags
      if (selectedTags.length > 0) {
        const hasTag = selectedTags.some((tag) => project.tags?.includes(tag));
        if (!hasTag) {
          return false;
        }
      }

      return true;
    });
  }, [projects, debouncedSearchQuery, selectedTags, showArchived]);

  // Toggle filter handlers
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
    setShowArchived(false);
  }, []);

  const hasActiveFilters =
    searchQuery || selectedTags.length > 0 || showArchived;

  // Handle the case where projects might not be loaded yet
  if (!projects || !Array.isArray(projects)) {
    return (
      <>
        <Head>
          <title>Portfolio | K@zuki.</title>
        </Head>
        <Heading>Portfolio</Heading>
        <div>Loading projects...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
      </Head>
      <Heading>{t('title')}</Heading>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder={
              locale === 'ja' ? 'プロジェクトを検索...' : 'Search projects...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Category Filter and Archive Checkbox */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">
                {locale === 'ja' ? 'カテゴリ:' : 'Category:'}
              </span>
              <button
                onClick={() => toggleTag('CLI')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes('CLI')
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                CLI
              </button>
              <button
                onClick={() => toggleTag('Website')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes('Website')
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Website
              </button>
              <button
                onClick={() => toggleTag('Extension')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes('Extension')
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Extension
              </button>
              <button
                onClick={() => toggleTag('Other')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes('Other')
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Other
              </button>
            </div>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowArchived(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600 bg-gray-700 border-gray-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-300">
                {locale === 'ja' ? 'アーカイブ済みを表示' : 'Show archived'}
              </span>
            </label>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              {locale === 'ja' ? 'フィルターをクリア' : 'Clear filters'}
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-400">
          {locale === 'ja'
            ? `${filteredProjects.length}件のプロジェクト`
            : `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug || project.title} project={project} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          {locale === 'ja'
            ? '条件に一致するプロジェクトが見つかりませんでした。'
            : 'No projects found matching your criteria.'}
        </div>
      )}
    </>
  );
}
