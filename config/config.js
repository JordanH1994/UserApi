'use strict'
const config = {
  development: {
    mode: 'development',
    port: 3500
  },
  staging: {
    mode: 'staging',
    port: 4000
  },
  production: {
    mode: 'production',
    port: 5000
  }
}
module.exports = (mode) => {
  return config[ mode || process.env.NODE_ENV ] || config.production
}
