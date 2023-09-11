import { Page } from '@/components/Layout'
import { Box } from '@mui/material'
import {
  SkillArea,
  ExperienceArea,
  CertificationArea,
} from '@/components/Pages/About'

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
  )
}
