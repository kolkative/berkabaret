/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf4ff',
          100: '#fae8ff',
          200: '#f3d0fe',
          300: '#e9a8fd',
          400: '#d870fa',
          500: '#c040ef',
          600: '#a21bd3',
          700: '#8716ae',
          800: '#6f178e',
          900: '#5c1872',
        },
        dark: {
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a25',
          600: '#252535',
          500: '#32324a',
        }
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
