import { alpha, createTheme } from '@mui/material'

export const Config = {
  title: 'zuki.dev',
  theme: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#0066ff',
      },
      secondary: {
        main: '#ff9900',
      },
      background: {
        default: '#212121',
        paper: '#212121',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '::-webkit-scrollbar': {
            width: '16px',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: alpha('#efefef', 0.3),
            borderRadius: '10px',
          },
        },
      },
    },
  }),
  navigation: {
    items: [
      { name: 'about', href: '/about' },
      { name: 'blog', href: 'https://khasegawa.hatenablog.com/' },
      { name: 'work', href: 'https://baratani.jp' },
      { name: 'portfolio', href: '/portfolio' },
    ],
  },
  analytics: {
    google: {
      id: 'G-ZJ7C2QM9W7',
    },
  },
}
