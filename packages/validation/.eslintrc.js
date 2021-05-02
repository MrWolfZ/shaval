const baseConfig = require('../../.eslintrc.js')

module.exports = {
  ...baseConfig,
  parserOptions: {
    project: require('path').join(__dirname, 'tsconfig.json'),
  },
}
