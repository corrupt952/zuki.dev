import { Grid, styled, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { AvatarIcon } from '@/components/Elements/Icon';
import { LinkText } from '@/components/Elements';

const SocialLinkText = styled(LinkText)({
  color: 'inherit',
  padding: 8,
  paddingLeft: 16,
  paddingRight: 0,
  ':last-child': {
    paddingRight: 16,
  },
  '> svg': {
    fontSize: '2rem',
  },
})

const HomeCentralizeGrid = styled(Grid)({
  display: 'flex',
  flex: 'auto',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
})

export default function Home() {
  const links = [
    { name: 'mail', href: 'mailto:k@zuki.dev', icon: <MailIcon sx={{ fontSize: '3rem' }} /> },
    { name: 'github', href: 'https://github.com/corrupt952', icon: <GitHubIcon /> },
    { name: 'twitter', href: 'https://twitter.com/corrupt952', icon: <TwitterIcon /> },
  ]

  return (
    <HomeCentralizeGrid container spacing={2}>
      <Grid item>
        <AvatarIcon width='12rem' />
      </Grid>
      <Grid item>
        <Typography variant="h4" noWrap>
          K@zuki.
        </Typography>
        <Typography variant="h5" noWrap>
          Web Developer, SRE
        </Typography>
      </Grid>
      <Grid item>
        {links.map((link) => {
          return (
            <SocialLinkText href={link.href} key={link.name}>{link.icon}</SocialLinkText>
          )
        })}
      </Grid>
    </HomeCentralizeGrid>
  )
}
