/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#B79EFF",
        secondary: "#E8DDFF",
        tertiary: "#FFEFB4",
        "black-100": "#461CA6",
        //"#7E57C2",
        "black-200": "#643FBC",
        "black-300": "#6200EA",
        "white-100": "#fff0f5",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      dropShadow: {
        text: "2px 5px 0 rgba(70, 28, 166, 0.5)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
