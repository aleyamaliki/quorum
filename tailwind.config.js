/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          darker: '#5a5842',
          dark: '#706d54',
          base: '#a08963',
          light: '#c9b194',
          lighter: '#d4c5ab',
        },
        neutral: '#dbdbdb',
        bg: '#9B9B9B',
        card: {
          DEFAULT: '#1f1f23',
          light: '#2a2a2f',
          dark: '#16161a',
        },
        dark: {
          bg: '#0a0a0b',
          surface: '#16161a',
          elevated: '#1f1f23',
          border: '#2a2a2f',
        },
        text: {
          DEFAULT: '#e4e4e7',
          muted: '#a1a1aa',
          dark: '#52525b',
        },
        accent: {
          cyan: '#06b6d4',
          purple: '#a855f7',
          green: '#10b981',
          red: '#ef4444',
          orange: '#f97316',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
