import { Heading } from '@/components/Typography/Heading';
import { Body } from '@/components/Typography/Body';
import { useTranslation } from '@/libs/i18n';

const skills = {
  Language: ['Ruby', 'Go', 'Python', 'JavaScript'],
  'CI/CD': ['GitHub Actions', 'CircleCI', 'Argo CD'],
  Monitoring: ['Elastic Stack', 'NewRelic', 'Datadog'],
  'Cloud Infrastructure': ['AWS', 'GCP'],
  Tools: ['Ansible', 'Terraform', 'Docker', 'Kubernetes'],
};

export const SkillArea = () => {
  const { t } = useTranslation('pages.about.skills');

  return (
    <>
      <Heading>{t('title')}</Heading>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-bold mb-2">{category}</h3>
            {items.map((skill) => (
              <Body key={skill}>{skill}</Body>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
