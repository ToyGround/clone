const colors = require('tailwindcss/colors');

module.exports = {
  purge   : [],
  darkMode: false, // or 'media' or 'class'
  theme   : {
    theme: {
      colors: {
        blueGray : colors.blueGray,
        coolGray : colors.coolGray,
        lime     : colors.lime,
        teal     : colors.teal,
        cyan     : colors.cyan,
        lightBlue: colors.lightBlue,
        pink     : colors.pink,
        rose     : colors.rose
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      textColor      : ['responsive', 'hover', 'focus', 'active', 'disabled'],
      opacity        : ['disabled'],
    }
  },
  plugins : [],
};
