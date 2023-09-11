import { Markdown } from '@/components/Elements/Markdown'
import { Page } from '@/components/Layout'
import { Body, Heading } from '@/components/Typography'
import { useTranslation } from '@/libs/i18n'
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
} from '@mui/material'

const ContentArea = () => {
  const { t } = useTranslation('pages.work.contents')
  const menus = t('support.menus', { returnObjects: true })

  return (
    <>
      <Heading>{t('title')}</Heading>

      <Typography variant="h6" gutterBottom>
        {t('support.title')}
      </Typography>
      {t('support.descriptions', { returnObjects: true }).map(
        (desc: string) => (
          <Body key={desc}>
            <Markdown markdown={desc} />
          </Body>
        ),
      )}
      <List sx={{ pl: 0, pr: 0 }}>
        {menus.map((menu: string) => (
          <ListItem key={menu} sx={{ pb: 0, pt: 0 }}>
            <Body>{menu}</Body>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom>
        {t('consultation.title')}
      </Typography>
      {t('consultation.descriptions', { returnObjects: true }).map(
        (desc: string) => (
          <Body key={desc}>
            <Markdown markdown={desc} />
          </Body>
        ),
      )}
    </>
  )
}

const PricingArea = () => {
  const { t } = useTranslation('pages.work.pricing')

  return (
    <>
      <Heading>{t('title')}</Heading>
      {t('descriptions', { returnObjects: true }).map((desc: string) => (
        <Body key={desc}>
          <Markdown markdown={desc} />
        </Body>
      ))}
      <Table sx={{ p: 0 }}>
        <TableHead>
          <TableRow>
            {t('menus.headers', { returnObjects: true }).map(
              (header: string) => (
                <TableCell key={header}>{header}</TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {t('menus.rows', { returnObjects: true }).map(
            (row: { [key: string]: string }) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      <List>
        {t('menus.notes', { returnObjects: true }).map((note: string) => (
          <ListItem key={note}>
            <Body>{note}</Body>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default function Work() {
  const { t } = useTranslation('pages.work')

  return (
    <Page>
      <Box>
        {t('descriptions', { returnObjects: true }).map((desc: string) => (
          <Body key={desc}>
            <Markdown markdown={desc} />
          </Body>
        ))}

        <Box height="3rem" />
        <ContentArea />
        <Box height="3rem" />
        <PricingArea />
      </Box>
    </Page>
  )
}
