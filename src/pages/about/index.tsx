import { Page } from "@/components/Layout";
import { Box } from "@mui/material";
import { SkillArea } from "@/pages/about/SkillArea";
import { ExperienceArea } from "@/pages/about//ExperienceArea";
import { CertificationArea } from "@/pages/about/CertificationArea";

export default function About() {
  return (
    <Page>
      <Box>
        <SkillArea />
        <Box height="3rem" />
        <ExperienceArea />
        <Box height="3rem" />
        <CertificationArea />
      </Box>
    </Page>
  );
}
