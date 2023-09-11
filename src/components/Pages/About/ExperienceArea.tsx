import {
  Box,
  List,
  ListItem,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineContentClasses,
  timelineOppositeContentClasses,
} from '@mui/lab'
import { LinkText } from '@/components/Elements'
import { Body, Heading } from '@/components/Typography'
import LaunchIcon from '@mui/icons-material/Launch'
import { useTranslation } from '@/libs/i18n'

type Experience = {
  startDate: string
  endDate?: string
  title: string
  company: string
  body: string
  links: { [key: string]: string }
}

const ExperienceTimeline = styled(Timeline)(({ theme }) => ({
  padding: 0,
  [theme.breakpoints.down('md')]: {
    [`& .${timelineOppositeContentClasses.root}`]: {
      flex: 0.25,
    },
  },
}))

const ExperienceTimelineItem = styled(TimelineItem)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    [`:nth-of-type(even) .${timelineContentClasses.root}`]: {
      boxShadow: '-2px 0 0 0 tan',
    },
  },
}))

export const ExperienceArea = () => {
  const { t } = useTranslation('pages.about.experience')
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const descriptions = t('descriptions', {
    returnObjects: true,
  }) as string[]
  const experiences = t('experiences', {
    returnObjects: true,
  }) as Experience[]

  return (
    <>
      <Heading>{t('title')}</Heading>
      {descriptions.map((description) => (
        <Body key={description}>{description}</Body>
      ))}

      <Box height="1rem" />

      <ExperienceTimeline position={matches ? 'right' : 'alternate'}>
        {experiences.map((experience) => {
          return (
            <ExperienceTimelineItem
              key={experience.title}
              sx={{
                ':nth-of-type(even) .MuiTimelineContent-root': {
                  textAlign: 'left',
                },
              }}
            >
              <TimelineOppositeContent
                sx={{ m: 'auto 0', whiteSpace: 'break-spaces' }}
                align="right"
                variant="body2"
                color="textSecondary"
              >
                {experience.startDate}
                {' ~ '}
                {experience.endDate && experience.endDate}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography
                  variant="h6"
                  sx={{
                    p: 0,
                    textTransform: 'uppercase',
                  }}
                  gutterBottom
                >
                  {experience.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {experience.company}
                </Typography>
                <Typography
                  variant="body2"
                  color="tan"
                  whiteSpace="break-spaces"
                >
                  {experience.body}
                </Typography>
                <List sx={{ p: 0 }}>
                  {experience.links &&
                    Object.entries(experience.links).map(([text, link]) => (
                      <ListItem key={link} sx={{ p: 0 }}>
                        <Typography
                          key={link}
                          variant="caption"
                          color="textSecondary"
                        >
                          <LinkText href={link}>
                            {text}
                            <LaunchIcon fontSize="inherit" />
                          </LinkText>
                        </Typography>
                      </ListItem>
                    ))}
                </List>
              </TimelineContent>
            </ExperienceTimelineItem>
          )
        })}
      </ExperienceTimeline>
    </>
  )
}
