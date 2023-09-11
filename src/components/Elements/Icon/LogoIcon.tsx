import React from 'react'
import { Box } from '@mui/material'
import logo from '@/assets/images/logo.png'

export const Logo = ({ width, height }: { width: string; height: string }) => {
  return (
    <Box
      component="img"
      src={logo.src}
      alt="logo"
      sx={{ display: { xs: 'none', md: 'flex' }, width: width, height: height }}
    />
  )
}
