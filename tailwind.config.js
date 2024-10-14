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
      keyframes: {
        starsMoving: {
          '100%': {transform: 'translateX(-4000px) translateY(-3000px)'},
        },
      },
      animation: {
        'spin-slow': 'spin 5s ease-in 1s 10' ,
        'spin-slower': 'spin 6s ease-in 1s 9 reverse',
        'starsAnim-1': 'starsMoving 50s linear infinite',
        'starsAnim-1-delayed': 'starsMoving 50s linear -25s infinite',
        'starsAnim-2': 'starsMoving 70s linear infinite',
        'starsAnim-2-delayed': 'starsMoving 70s linear -35s infinite',
        'starsAnim-3': 'starsMoving 120s linear infinite',
        'starsAnim-3-delayed': 'starsMoving 120s linear -60s infinite',
      },
    },
  },
  plugins: [],
};