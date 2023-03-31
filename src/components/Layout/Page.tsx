import { Grid, styled } from "@mui/material"

const PageGrid = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'auto',
  alignSelf: 'baseline',
})

const PageGridItem = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
})

export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageGrid container>
      <PageGridItem item xs={12} md={8}>
        {children}
      </PageGridItem>
    </PageGrid>
  )
}
