import { Body, Heading } from '@/components/Typography'
import { useTranslation } from '@/libs/i18n'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'

type Affilication = {
  name: string
  date: string
  role: string
}

export const AffilicationArea = () => {
  const { t } = useTranslation('pages.about.affilication')
  const affilications = t('affilications', {
    returnObjects: true,
  }) as Affilication[]

  return (
    <>
      <Heading>{t('title')}</Heading>
      {/* {descriptions.map((description) => (
        <Body key={description}>{description}</Body>
      ))} */}

      <Box height="2rem" />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('thead.name')}</TableCell>
            <TableCell>{t('thead.role')}</TableCell>
            <TableCell>
              <span>{t('thead.date')}</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {affilications.map((afflication) => (
            <TableRow key={afflication.name}>
              <TableCell>{afflication.name}</TableCell>
              <TableCell>{afflication.role}</TableCell>
              <TableCell>{afflication.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
