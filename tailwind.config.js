module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#EDF3FB',
          DEFAULT: '#2027D2',
          dark: '#131679',
        },
        secondary: {
          DEFAULT: '#171717',
          250: 'rgba(23,23,23,0.25)',
        },
      },
      boxShadow: {
        base:
          '0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
