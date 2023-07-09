/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-sheen": "#79B695",
        "dark-pastel-red": "#C13A22",
        "silver-sand": "#B4BCC7",
        'header' : "#495378",
        'emerald': "#4EB47C",
        'box-header' : '#DBCBCB', 
        'click' : '#5B6380',
        'nav' : '#F8F8F8',
        'tracker' : "#D9D9D9"
      },
    },
  },
  plugins: [],
};
