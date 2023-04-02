import { Page } from "@/components/Layout";
import {
  CertificationArea,
  ExperienceArea,
  SkillArea,
} from "@/components/Pages/About";
import { Box } from "@mui/material";

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
