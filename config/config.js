'use strict';
var config = {
  development: {
    mode: 'development',
    port: 3500,
    database: {
      username: 'api',
      password: 'api',
      database: 'api',
      host: 'localhost',
      dialect: 'postgres'
    }
  },
  staging: {
    mode: 'staging',
    port: 4000,
    database: {
      username: 'api',
      password: 'api',
      database: 'api',
      host: 'localhost',
      dialect: 'postgres'
    }
  },
  production: {
    mode: 'production',
    port: 5000,
    database: {
      username: 'api',
      password: 'api',
      database: 'api',
      host: 'localhost',
      dialect: 'postgres'
    }
  }
};
module.exports = function(mode) {
  return config[mode || process.argv[2] || 'development'] || config.development;
};
