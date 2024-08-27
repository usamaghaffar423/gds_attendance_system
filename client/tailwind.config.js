/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customYellow: "#FFBC11",
        customDark: "#11121E",
        customBlueDark: "#1D1D29",
        customBlueDarkHigh: "#11121E",
      },
    },
  },
  plugins: [],
};
