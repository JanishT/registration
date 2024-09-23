/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(252,197,191,1) 23%, rgba(196,196,196,1) 89%)',
        'custom-card-background': 'radial-gradient(circle, rgba(255,232,230,1) 0%, rgba(237,237,237,1) 89%)',
      },
    },
  },
  plugins: [],
}

