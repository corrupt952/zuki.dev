import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        foreground: 'var(--foreground-color)',
        primary: {
          '50': 'var(--primary-color-50)',
          '100': 'var(--primary-color-100)',
          '200': 'var(--primary-color-200)',
          '300': 'var(--primary-color-300)',
          '400': 'var(--primary-color-400)',
          '500': 'var(--primary-color-500)',
          '600': 'var(--primary-color-600)',
          '700': 'var(--primary-color-700)',
          '800': 'var(--primary-color-800)',
          '900': 'var(--primary-color-900)',
          '950': 'var(--primary-color-950)',
        },
        secondary: {
          '50': 'var(--secondary-color-50)',
          '100': 'var(--secondary-color-100)',
          '200': 'var(--secondary-color-200)',
          '300': 'var(--secondary-color-300)',
          '400': 'var(--secondary-color-400)',
          '500': 'var(--secondary-color-500)',
          '600': 'var(--secondary-color-600)',
          '700': 'var(--secondary-color-700)',
          '800': 'var(--secondary-color-800)',
          '900': 'var(--secondary-color-900)',
          '950': 'var(--secondary-color-950)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
