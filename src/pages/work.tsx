import { LinkText } from "@/components/Elements";
import { Markdown } from "@/components/Elements/Markdown";
import { Page } from "@/components/Layout";
import { Body, Heading } from "@/components/Typography";
import {
  Box,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ContentArea = () => {
  const menus = [
    'Support for launching services',
    'AWS implementation support (including multi-account configuration)',
    'Infrastrucutre as Code implementation and start-up support',
    'Consultation and start-up support for container migration',
    'Troubleshooting support and consultation',
    'Consultation and support for introduction and upgrade of various middleware and services',
    'Monitoring implementation support',
  ];

  return (
    <>
      <Heading>Contents</Heading>

      <Typography variant="h6" gutterBottom>
        Web Service Development and Operation Support
      </Typography>
      <Body>
        We provide assistance and consultation on various tasks related to the
        development and operation of web services.
      </Body>
      <List sx={{ pl: 0, pr: 0 }}>
        {menus.map((menu) => (
          <ListItem key={menu} sx={{ pb:0, pt: 0 }}>
            <Body>* {menu}</Body>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom>Technical consultation and mentoring</Typography>
      <Body>
        We do not actively provide this service at this time, but do so as
        needed.
      </Body>
      <Body>
        Mentoring will be provided on a best-effort basis on either Discord or
        Slack platforms.
      </Body>
    </>
  );
};

export default function Work() {
  return (
    <Page>
      <Box>
        <Body>Working as K@zuki. under the trade name BARATANI KIKAKU.</Body>
        <Body>
          I provide support, service development and assistance for various
          infrastructures, monitoring tools and container related technologies.
          I am also available for consultations, so please feel free to contact
          me.
        </Body>
        <Body>
          Please contact me via{" "}
          <LinkText href="https://twitter.com/corrupt952">Twitter</LinkText> or{" "}
          <LinkText href="mailto:k@zuki.dev">E-mail</LinkText> for job requests
          and invitations.
        </Body>

        <Box height="3rem" />
        <ContentArea />
        <Box height="3rem" />

        <Heading>Pricing</Heading>
        <Body>The following is the price list for the services I provide.</Body>
        <Table sx={{ p: 0 }}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell align="right">Price（Included Tax）</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                Support for development and operation of web services
              </TableCell>
              <TableCell>1Hour</TableCell>
              <TableCell align="right">¥11,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Online Consultation (First time)</TableCell>
              <TableCell>1Hour</TableCell>
              <TableCell align="right">¥3,300</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Online Consultation (2nd or later)</TableCell>
              <TableCell>1Hour</TableCell>
              <TableCell align="right">¥6,600</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Offline consultation *1</TableCell>
              <TableCell>1Hour</TableCell>
              <TableCell align="right">¥11,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mentoring ※1</TableCell>
              <TableCell>1Hour</TableCell>
              <TableCell align="right">¥11,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <List>
          <ListItem>
            <Body>
              *1 Travel expenses will be charged separately for offline
              consultation and mentoring.
            </Body>
          </ListItem>
        </List>
      </Box>
    </Page>
  );
}
