/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'authimg': "url('../src/assets/loginImage.png')",
      },
    },
  },
  plugins: [],
}

