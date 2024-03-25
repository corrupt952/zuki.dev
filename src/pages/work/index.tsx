import { Markdown } from '@/components/Elements/Markdown'
import { Page } from '@/components/Layout'
import { Body, Heading } from '@/components/Typography'
import { useTranslation } from '@/libs/i18n'
import {
  Box,
  Button,
  FormControl,
  Input,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'

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

const InquiryArea = () => {
  const { t } = useTranslation('pages.work.inquiry')

  console.log(t('title'))

  return (
    <>
      <Heading>{t('title')}</Heading>
      {t('descriptions', { returnObjects: true }).map((desc: string) => (
        <Body key={desc}>
          <Markdown markdown={desc} />
        </Body>
      ))}
      <Box
        component="form"
        id="form"
        method="POST"
        sx={{
          width: '100%',
          pt: 2,
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdnIxC9Bk0jeQ6Qfj_fWDt6MbS4uqwE38Jpx4CUvs-dgPCZdA/formResponse"
      >
        <TextField
          name="entry.772574949"
          placeholder={t('form.name')}
          fullWidth
          sx={{
            mb: 2,
          }}
        />
        <TextField
          name="entry.1315418939"
          placeholder={t('form.email')}
          fullWidth
          sx={{
            mb: 2,
          }}
        />
        <TextField
          name="entry.1404312101"
          placeholder={t('form.subject')}
          multiline
          fullWidth
          sx={{
            mb: 2,
          }}
        />
        <TextField
          name="entry.745112553"
          placeholder={t('form.content')}
          multiline
          rows={5}
          fullWidth
          sx={{
            mb: 2,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {t('form.submit')}
        </Button>
      </Box>
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
        <Box height="3rem" />
        <InquiryArea />
      </Box>
    </Page>
  )
}
