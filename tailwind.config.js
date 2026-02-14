const path = require('path');

module.exports = {
  content: [
    path.resolve(__dirname, 'src/*.tsx'),
    path.resolve(__dirname, 'public/*.html'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


