module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: {
          700: '#331DB3',
          600: '#4D2DDA',
          500: '#7455E6',
          400: '#9D80F2',
          300: '#C6B0FF',
          200: '#E5D9FF'
        },
        background: '#171717',
        backgroundInput: '#4F4F4F'
      }
    },
  },
  variants: {
    extend: {
      ringWidth: ['hover', 'active']
    },
  },
  plugins: [],
}
