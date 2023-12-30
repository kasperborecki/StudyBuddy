module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        k2d: ['K2D', 'sans-serif'],
        jua: ['Jua', 'sans-serif'],
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
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
