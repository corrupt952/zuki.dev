import { Config } from '@/config'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Grid, IconButton, Menu, MenuItem, styled } from '@mui/material'
import React, { useRef } from 'react'
import { LinkText } from '../Elements'

const NavigationLinkText = styled(LinkText)({
  color: 'inherit',
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 16,
  paddingRight: 0,
  ':first-child': {
    paddingLeft: 8,
  },
})

const NavigationMenuText = styled(LinkText)({
  color: 'inherit',
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 16,
  paddingRight: 16,
})

const StyledAppBar = styled(AppBar)({
  backgroundImage: 'none',
  boxShadow: 'none',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  padding: 0,
  margin: 0,
})

const StyledToolbar = styled(Grid)({
  padding: 0,
  margin: 0,
})

const StyledMenu = styled(Menu)({
  backgroundImage: 'none',
  boxShadow: 'none',
  display: 'flex',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  padding: 0,
  margin: 0,
})

const HeaderCentralizeGrid = styled(Grid)({
  margin: 0,
  padding: 0,
  display: 'flex',
  flex: 'auto',
  flexDirection: 'row',
  textAlign: 'center',
  alignItems: 'stretch',
  justifyContent: 'center',
})

const HeaderCentralizeGridItem = styled(Grid)({
  margin: 0,
  padding: 0,
})

const NavigationLinks = () => {
  return (
    <>
      {Config.navigation.items.map((item) => {
        return (
          <NavigationLinkText href={item.href} key={item.name}>
            {item.name}
          </NavigationLinkText>
        )
      })}
    </>
  )
}

const NavigationMenu = () => {
  const [open, setOpen] = React.useState(false)
  const anchorEl = useRef<HTMLButtonElement>(null)

  return (
    <>
      <IconButton
        ref={anchorEl}
        onClick={() => setOpen(true)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <StyledMenu
        keepMounted
        open={open}
        anchorEl={anchorEl.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {Config.navigation.items.map((item) => {
          return (
            <MenuItem
              component={NavigationMenuText}
              passHref
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </MenuItem>
          )
        })}
      </StyledMenu>
    </>
  )
}

export const Header = () => {
  return (
    <StyledAppBar>
      <StyledToolbar>
        <HeaderCentralizeGrid container>
          <HeaderCentralizeGridItem item xs={12} md={8}>
            <Grid container justifyContent={'space-between'}>
              <Grid item sx={{ display: 'flex' }}>
                <NavigationLinkText href="/">{Config.title}</NavigationLinkText>
              </Grid>
              <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
                <NavigationLinks />
              </Grid>
              <Grid item sx={{ display: { xs: 'flex', md: 'none' } }}>
                <NavigationMenu />
              </Grid>
            </Grid>
          </HeaderCentralizeGridItem>
        </HeaderCentralizeGrid>
      </StyledToolbar>
    </StyledAppBar>
  )
}
