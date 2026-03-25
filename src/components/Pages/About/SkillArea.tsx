import { Heading } from '@/components/Typography/Heading';
import { Body } from '@/components/Typography/Body';
import { useTranslation } from '@/libs/i18n';

type SkillCategory = {
  name: string;
  items: string[];
};

export const SkillArea = () => {
  const { t } = useTranslation('pages.about.skills');
  const categories = t<SkillCategory[]>('categories', {
    returnObjects: true,
  });

  return (
    <>
      <Heading>{t('title')}</Heading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {Array.isArray(categories) &&
          categories.map((category) => (
            <div key={category.name}>
              <h3 className="text-lg font-bold mb-2">{category.name}</h3>
              {category.items.map((skill) => (
                <Body key={skill}>{skill}</Body>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};
