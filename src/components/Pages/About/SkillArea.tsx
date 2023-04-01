import { Body, Heading } from "@/components/Typography";
import { Grid, Typography } from "@mui/material";

const skills = {
  Language: ["Ruby", "Go", "Python", "JavaScript"],
  "CI/CD": ["GitHub Actions", "CircleCI", "Argo CD"],
  Monitoring: ["Elastic Stack", "NewRelic", "Datadog"],
  "Cloud Infrastructure": ["AWS", "GCP"],
  Tools: ["Ansible", "Terraform", "Docker", "Kubernetes"],
};

export const SkillArea = () => {
  return (
    <>
      <Heading>Skills</Heading>
      <Grid container spacing={2} textAlign='center'>
        {Object.entries(skills).map(([category, skills]) => {
          return (
            <Grid item key={category} xs={4} md={3}>
              <Typography variant='h6'>{category}</Typography>
              {skills.map((skill) => <Body key={skill}>{skill}</Body>)}
            </Grid>
          )
        })}
      </Grid>
    </>
  );
};
