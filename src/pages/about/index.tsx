import { Page } from '@/components/Layout';
import {
  SkillArea,
  ExperienceArea,
  CertificationArea,
  AffiliationArea,
} from '@/components/Pages/About';

export default function About() {
  return (
    <Page>
      <div>
        <SkillArea />
        <div className="h-12" />
        <AffiliationArea />
        <div className="h-16" />
        <ExperienceArea />
        <div className="h-12" />
        <CertificationArea />
      </div>
    </Page>
  );
}
