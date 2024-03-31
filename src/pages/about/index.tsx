import { Page } from '@/components/Layout'
import { Box } from '@mui/material'
import {
  SkillArea,
  ExperienceArea,
  CertificationArea,
  AffilicationArea,
} from '@/components/Pages/About'

export default function About() {
  return (
    <Page>
      <Box>
        <SkillArea />
        <Box height="3rem" />
        <AffilicationArea />
        <Box height="4rem" />
        <ExperienceArea />
        <Box height="3rem" />
        <CertificationArea />
      </Box>
    </Page>
  )
}
