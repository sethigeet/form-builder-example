module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        blue: {
          900: "#214073",
        },
        slate: {
          800: "#0E1C34",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
