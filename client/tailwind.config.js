module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
    './src/**/*.svg',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width:{
        'center':'600px',
        'rightSmall':'290px',
        'rightLarge':'350px',
        'leftSmall':'68px',
        'leftLarge':'275px',
        'profilePicWidth':'133.5px'
      },
      height:{
        'coverPhotoHeight': '200px',
        'profilePicHeight': '133.5px',
      },
      screens: {
        'leftShowLarge': '1230px',
        'rightShowSmall': '1018px',
        'rightShowLarge': '1107px'
      },
      colors: {
        'primary': '#1b95e0',
        'enabledButton': '#1d9bf0',
        'hoveredButton': '',
        'clickedButton': '',
      },
      opacity: {
        'disabled': '.5'
      },
      backgroundImage: theme => ({
        'landing-left': "url('/src/icons/landing.png')"
      })
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
