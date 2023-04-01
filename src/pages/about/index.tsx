import { Page } from "@/components/Layout";
import { Box } from "@mui/material";
import { ExperienceArea } from "./ExperienceArea";
import { CertificationArea } from "./CertificationArea";
import { SkillArea } from "./SkillArea";

export default function About() {
  return (
    <Page>
      <Box>
        <SkillArea />
        <Box height='3rem' />
        <ExperienceArea />
        <Box height='3rem' />
        <CertificationArea />
      </Box>
    </Page>
  )
}
