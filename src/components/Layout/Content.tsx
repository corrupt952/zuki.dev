import { styled } from "@mui/material";

const StyledContent = styled('main')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'auto',
  padding: '8px',
  marginTop: '88px',
})

export const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledContent>
      {children}
    </StyledContent>
  )
}
