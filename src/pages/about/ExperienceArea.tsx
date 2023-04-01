import {
  Box,
  List,
  ListItem,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
} from "@mui/lab";
import { LinkText } from "@/components/Elements";
import { Body, Heading } from "@/components/Typography";
import LaunchIcon from "@mui/icons-material/Launch";

type Experience = {
  startDate: Date;
  endDate?: Date;
  title: string;
  company: string;
  body: string;
  links?: Map<string, string>;
};

const experiences: Experience[] = [
  {
    startDate: new Date(2019, 1, 1),
    title: "Support for Development and operation of web services",
    company: "BARATANI KIKAKU - Self employment",
    body: `As a sole proprietor, I assist various companies in the development and operation of web services.
For more information, please check the link.`,
    links: new Map([["/work", "BARATANI KIKAKU"]]),
  },
  {
    startDate: new Date(2023, 3, 1),
    title: "Head of Product Tech Lead",
    company: "Studist Corporation.",
    body: `Has finally responsibility and decision-making for technical decisions in specific products and for the technical aspects of roadmap realization.
Provides recommendations and support for technical decisions that are not limited to a specific product, but that cut across the entire organization.`,
  },
  {
    startDate: new Date(2019, 6, 1),
    endDate: new Date(2020, 12, 1),
    title: "Migration of services to container platforms",
    company: "Studist Corporation.",
    body: `We built and deployed various internal services, including services that have been developed and operated since 2013, using containers from development to production.
We switched from EC2 to EKS infrastructure without shutting down the service.`,
    links: new Map([
      [
        "https://studist.tech/teahcme-biz-containerization-58908cbcf966",
        "Teachme Bizの基盤移行への道のり",
      ],
    ]),
  },
  {
    startDate: new Date(2021, 1, 1),
    endDate: new Date(2021, 6, 1),
    title: "Support for launching new services",
    company: "Studist Corporation.",
    body: `I was working on the cloud infrastructure, development environment, and CI/CD for a new service launch.
The service was developed in Clojure, but since the company's standard APM did not support Ring, we had to implement middleware to support it for the company.`,
  },
  {
    startDate: new Date(2018, 10, 1),
    title: "Support for other teams and organizations",
    company: "Studist Corporation.",
    body: `As an Enabling SRE and Tech Lead, we provide consultation and support for decision making based on container technology, systems, and various architectures, how to create applications and infrastructure with post-release operations in mind, and development and operations as needed.`,
  },
  {
    startDate: new Date(2015, 1, 1),
    endDate: new Date(2018, 6, 1),
    title: "Development and operation of core systems and VOD web services",
    company: "TIMEINTERMEDIA, Inc.",
    body: `In the beginning, I developed a core system for managing contents as a development member, and from the middle of the project, I was engaged in the design and development of web services for general users as a development leader.
From the middle of the project, I was also engaged in the development and operation of web services in the same family.`,
  },
  {
    startDate: new Date(2014, 2, 1),
    endDate: new Date(2014, 12, 1),
    title: "Development and operation of qualification management system",
    company: "TIMEINTERMEDIA, Inc.",
    body: `I worked on development as a development member, and after release, I worked on development and operations as a development leader.
It was a good opportunity to learn about projects I have been involved in since my part-time job, Git, Ruby on Rails, multi-person development and execution, and project management.
I learned about the attitude of reporting bugs in the libraries we use, and I also introduced and practiced test-driven development to prevent this from happening.`,
  },
  {
    startDate: new Date(2013, 6, 1),
    endDate: new Date(2014, 1, 1),
    title: "Development of secondhand goods e-commerce service",
    company: "TIMEINTERMEDIA, Inc.",
    body: `At the time, I was working almost full-time in development as a part-time student worker. I learned about the tools and concepts used in development at the time.
I also learned about Spring Framework, service performance, Git, Mercurial, and other technologies for the first time.`,
  },
];

const ExperienceTimeline = styled(Timeline)(({ theme }) => ({
  padding: 0,
  [theme.breakpoints.down("md")]: {
    [`& .${timelineOppositeContentClasses.root}`]: {
      flex: 0.2,
    },
  },
}));

const ExperienceTimelineItem = styled(TimelineItem)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    [`:nth-of-type(even) .${timelineContentClasses.root}`]: {
      boxShadow: "-2px 0 0 0 tan",
    },
  },
}));

export const ExperienceArea = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Heading>Work Experience</Heading>
      <Body>
        Since 2013/06 to 2018/09, I was engaged in the development, operation,
        maintenance, and construction of various mission-critical systems and
        web services at Time Intermedia Inc. as well as training team members
        and supporting PMs.
      </Body>
      <Body>
        Since 2018/10, at Studist Inc., I have been involved in the launch,
        operation, maintenance, development support, construction, availability
        and performance improvement of various services operated by Studist,
        training and supporting independent development teams, providing tools
        to streamline operations, reviewing the overall service architecture and
        decision-making.
      </Body>
      <Body>
        Since 2019/01, I have been providing development and operational support
        to other companies as a sole proprietor while concurrently working as a
        company employee.
      </Body>

      <Box height="1rem" />

      <ExperienceTimeline position={matches ? "right" : "alternate"}>
        {experiences.map((experience) => {
          return (
            <ExperienceTimelineItem
              key={experience.title}
              sx={{
                ":nth-of-type(even) .MuiTimelineContent-root": {
                  textAlign: "left",
                },
              }}
            >
              <TimelineOppositeContent
                sx={{ m: "auto 0", whiteSpace: "break-spaces" }}
                align="right"
                variant="body2"
                color="textSecondary"
              >
                {experience.startDate.toLocaleDateString()}
                {" ~ "}
                {experience.endDate && experience.endDate.toLocaleDateString()}
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
                    textTransform: "uppercase",
                  }}
                  gutterBottom
                >
                  {experience.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
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
                    Array.from(experience.links).map(([link, text]) => (
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
          );
        })}
      </ExperienceTimeline>
    </>
  );
};
