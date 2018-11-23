var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://132.232.100.17:4009/v1"',
  MOCK_URL: '"https://easy-mock.com/mock/5bcd3309843f0a4819f79392/v1"',
})
