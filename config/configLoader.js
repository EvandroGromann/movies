const path = require('path')
const info = require(path.join(__dirname, 'info.json'))

const baseConfig = { info }
const environment = require('config/env')

module.exports = {
  loadEnvironment: async () => ({
    ...baseConfig,
    ...environment
  })
}
