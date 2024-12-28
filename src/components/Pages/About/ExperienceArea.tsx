import LinkText from '@/components/Elements/LinkText';
import { Body, Heading } from '@/components/Typography';
import { useTranslation } from '@/libs/i18n';
import { ExternalLink } from 'lucide-react';

type Experience = {
  startDate: string;
  endDate?: string;
  title: string;
  company: string;
  body: string;
  links: { [key: string]: string };
};

export const ExperienceArea = () => {
  const { t } = useTranslation('pages.about.experience');
  const descriptions = t('descriptions', {
    returnObjects: true,
  }) as string[];
  const experiences = t('experiences', {
    returnObjects: true,
  }) as Experience[];

  return (
    <>
      <Heading>{t('title')}</Heading>
      {descriptions.map((description) => (
        <Body key={description}>{description}</Body>
      ))}

      <div className="h-8" />

      <div className="relative">
        {experiences.map((experience, index) => {
          const isEven = index % 2 === 0;
          const ExperienceContent = () => (
            <div className="space-y-2">
              <h6 className="text-lg font-semibold uppercase m-0 brightness-150">
                {experience.title}
              </h6>
              <p className="m-0">{experience.company}</p>
              <p className="whitespace-pre-wrap text-orange-200">
                {experience.body}
              </p>
              <ul className="p-0 list-none">
                {experience.links &&
                  Object.entries(experience.links).map(([text, link]) => (
                    <li key={link} className="p-0">
                      <LinkText href={link} className="text-primary-600">
                        {text}
                        <ExternalLink className="inline w-4 h-4" />
                      </LinkText>
                    </li>
                  ))}
              </ul>
            </div>
          );

          const DateContent = ({ isEven }: { isEven: boolean }) => (
            <div
              className={`whitespace-pre-wrap flex items-center h-full ${isEven ? 'justify-end' : ''}`}
            >
              {experience.startDate}
              {' ~ '}
              {experience.endDate && experience.endDate}
            </div>
          );

          return (
            <div key={experience.title} className="flex gap-4 mb-8">
              <div className={`flex-1 ${isEven ? 'text-right' : ''}`}>
                {isEven ? (
                  <DateContent isEven={isEven} />
                ) : (
                  <ExperienceContent />
                )}
              </div>

              <div className="flex flex-col items-center">
                <div className="w-0.5 h-full bg-gray-300" />
                <div className="w-3 h-6 rounded-full bg-gray-300 m-4" />
                <div className="w-0.5 h-full bg-gray-300" />
              </div>

              <div className={`flex-1 ${!isEven ? 'text-right' : ''}`}>
                {isEven ? (
                  <ExperienceContent />
                ) : (
                  <DateContent isEven={isEven} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
