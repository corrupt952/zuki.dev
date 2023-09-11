import { Config } from '@/config'
import {
  Box,
  CssBaseline,
  MenuItem,
  Select,
  SelectChangeEvent,
  StyledEngineProvider,
  SvgIcon,
  ThemeProvider,
} from '@mui/material'
import React, { useContext } from 'react'
import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'
import { I18nContext, LOCALES } from '@/libs/i18n'
import LanguageIcon from '@mui/icons-material/Language'

const LanguageSelect = () => {
  const { locale, setLocale } = useContext(I18nContext)
  const handleChange = (event: SelectChangeEvent) => {
    setLocale(event.target.value)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '1rem',
        right: '0.5rem',
      }}
    >
      <Select
        value={locale}
        size="small"
        onChange={handleChange}
        renderValue={(value: string) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SvgIcon sx={{ mr: 1 }} fontSize="small">
              <LanguageIcon />
            </SvgIcon>
            {value.toUpperCase()}
          </Box>
        )}
      >
        {LOCALES.map((locale: string) => (
          <MenuItem key={locale} value={locale}>
            {locale.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Config.theme}>
        <CssBaseline />
        <Header />
        <Content>{children}</Content>
        <Footer />
        <LanguageSelect />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
