module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        k2d: ['K2D', 'sans-serif'],
        jua: ['Jua', 'sans-serif'],
        'madimi': ['Madimi One', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
      colors: {
        primary: '#4673ce',
        secondary: '#1b387e',
        tertiary: '#5260ff',
        customGray: '#717171',
        saffron: '#eebd31',
        lilac: '#F8F7FF',
        gallery: '#EBEBEB',
        mischka: '#E1DFEA',
        whisper: '#F0EFF7',
      },
      boxShadow: {
        top: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
        bottom: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("daisyui"),
  ]
};
