import primeui from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.vue',
    './components/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [primeui]
}

