/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          blue: {
            800: '#1e3a8a',
            900: '#172554',
          },
          yellow: {
            400: '#facc15',
            500: '#eab308',
          }
        },
        fontFamily: {
          sans: ['Arial', 'sans-serif'],
          serif: ['Georgia', 'serif'],
        },
      },
    },
    plugins: [],
  }