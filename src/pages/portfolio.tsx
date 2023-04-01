import { Page } from "@/components/Layout";
import { Heading } from "@/components/Typography";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

type Project = {
  title: string;
  description: string;
  link: string;
  archived: boolean;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "zuki.dev",
    description: "this website",
    link: "https://github.com/corrupt952/zuki.dev",
    archived: false,
    tags: ["Website", "TypeScript"],
  },
  {
    title: "picturnize",
    description: "Generate the icons needed to create the service.",
    link: "https://picturnize.zuki.dev",
    tags: ["Website", "React", "TypeScript"],
    archived: false,
  },
  {
    title: "WordySquirrel",
    description: "A generate blog outlines from the text.",
    link: "https://wordy.zuki.dev/",
    tags: ["Website", "Flutter", "OpenAI"],
    archived: false,
  },
  {
    title: "closest",
    description:
      "The command that searches the current directory or parent directories for a specific file and returns the closest path.",
    link: "https://github.com/corrupt952/closest",
    archived: false,
    tags: ["Plugin", "Sketch", "JavaScript"],
  },
  {
    title: "Retry command",
    description: "Retries an Action step if it fails.",
    link: "https://github.com/marketplace/actions/retry-command",
    archived: false,
    tags: ["Plugin", "GitHub Actions", "Shell"],
  },
  {
    title: "tmuxist",
    description: "A tmux bootstrap script.",
    link: "https://github.com/corrupt952/tmuxist",
    archived: false,
    tags: ["CLI", "Go", "Shell", "tmux"],
  },
  {
    title: "kz",
    description: "A simple kusotmize version manager.",
    link: "https://github.com/corrupt952/kz",
    archived: false,
    tags: ["CLI", "Shell"],
  },
  {
    title: "env-revealer",
    description:
      "Container that returns environment variables that can be referenced.",
    link: "https://github.com/corrupt952/env-revealer",
    archived: false,
    tags: ["Container", "Go", "Docker"],
  },
  {
    title: "ssm-session",
    description: "A simple wrapper for AWS SSM Session Manager",
    link: "https://github.com/corrupt952/ssm-session",
    archived: false,
    tags: ["CLI", "Shell", "AWS"],
  },
  {
    title: "md2html",
    description: "Convert markdown to html.",
    link: "https://github.com/corrupt952/md2html",
    archived: true,
    tags: ["Website", "Ruby"],
  },
  {
    title: "Slacker",
    description: "Notify events from BitBucket to Slack.",
    link: "https://github.com/corrupt952/slacker",
    archived: true,
    tags: ["Plugin", "BitBucket", "Java"],
  },
  {
    title: "lily",
    description: "Online Ruby interpreter.",
    link: "https://github.com/corrupt952/lily",
    archived: true,
    tags: ["Website", "Ruby"],
  },
  {
    title: "SketchBundle",
    description:
      "SketchBundle makes sure Sketch 3 run the same plugins on every machine.",
    link: "https://github.com/corrupt952/SketchBundle",
    archived: true,
    tags: ["CLI", "Go"],
  },
  {
    title: "postoss",
    description: "A simple blog system written in Ruby on Rails.",
    link: "https://github.com/corrupt952/postoss",
    archived: true,
    tags: ["Gem", "Ruby"],
  },
  {
    title: "pjtree",
    description:
      "Make any directory and files by json. Make directory hierarchy to json.",
    link: "https://github.com/corrupt952/pjtree",
    archived: true,
    tags: ["CLI", "Python"],
  },
  {
    title: "pyxenter",
    description: "Control your ESXi and Xen servers from the command line.",
    link: "https://github.com/corrupt952/pyxenter",
    tags: ["CLI", "Python", "ESXi", "Xen"],
    archived: true,
  },
];

const Archived = () => {
  return (
    <Typography variant="caption" color="red">
      (archived)
    </Typography>
  );
};

// TODO: tags
// TODO: filter tags
// TODO: image
export default function Portfolio() {
  return (
    <Page>
      <Box>
        <Heading>Portfolio</Heading>
        <Grid container spacing={2}>
          {projects.map((project) => {
            return (
              <Grid item key={project.title} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardActionArea href={project.link}>
                    <CardContent sx={{ height: 150, overflow: "hidden" }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {project.title} {project.archived && <Archived />}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>{/* TODO: tags */}</CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Page>
  );
}
