import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        navy: {
          DEFAULT: '#0065A4',
          100: '#005285',
        },
        alabaster: '#F0F0F0',
      },
      boxShadow: {
        forms: 'inset 2px 2px 6px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config
