import { Box, styled, Typography } from "@mui/material"

const StyledFooter = styled('footer')({
  flex: 'none',
  padding: 8,
  textAlign: 'center',
})

export const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="body2" color="textSecondary" align="center">
        {`@ 2023- K@zuki. All rights reserved.`}
      </Typography>
    </StyledFooter>
  )
}
