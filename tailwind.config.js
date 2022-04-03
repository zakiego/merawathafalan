/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // black: colors.black,
      black: "#0F2027",
      blue: colors.blue,
      red: colors.red,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      green: colors.green,
      slate: colors.slate,
    },
    extend: {
      colors: {
        primary: "#203760",
        outline: "#f3f4f6",
      },
      fontFamily: {
        hafs: ["KFGQPC Uthmanic Script HAFS", "sans-serif"],
        sans: ["Inter"],
      },
    },
    // fontFamily: {
    //   sans: ["Inter", "system-ui"],
    //   arabic: ["KFGQPC Uthmanic Script HAFS", "system-ui"],
    // },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
