/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fefaf5',
          100: '#fdf3e7',
          200: '#fbe6cf',
        },
        brand: {
          50: '#fff5ec',
          100: '#ffe6d0',
          200: '#ffc89a',
          300: '#ffa463',
          400: '#fb8235',
          500: '#f97316',
          600: '#df5a05',
          700: '#b8430a',
          800: '#94380f',
          900: '#7c2d12',
        },
        ink: {
          50: '#f8f5f1',
          100: '#ece6df',
          200: '#d8cfc4',
          400: '#7a6f63',
          500: '#5b5247',
          700: '#3a342c',
          900: '#1f1b16',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(124, 45, 18, 0.18)',
        glow: '0 20px 60px -20px rgba(249, 115, 22, 0.55)',
      },
    },
  },
  plugins: [],
};
