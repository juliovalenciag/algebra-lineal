/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#192A40',
        'primary': '#36596F',
        'secondary': '#296573',
        'accent': '#689BA6',
        'background-light': '#CDDCE4',
        'dark-background': '#1A202C',
        'dark-foreground': '#2D3748',
      },
    },
  },
  plugins: [],
}

