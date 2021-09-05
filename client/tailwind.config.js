module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
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
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
