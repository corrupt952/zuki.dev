export const Config = {
  title: 'zuki.dev',
  navigation: {
    items: [
      { name: 'about', href: '/about' },
      { name: 'blog', href: 'https://khasegawa.hatenablog.com/' },
      { name: 'work', href: '/work' },
      { name: 'portfolio', href: '/portfolio' },
    ],
  },
  analytics: {
    google: {
      id: process.env.NEXT_PUBLIC_GA_ID || 'G-ZJ7C2QM9W7',
    },
  },
};
