"use strict";

module.exports = {
  'development': {
    'username': 'root',
    'password': '123456',
    'database': 'database_development1',
    'host': '127.0.0.1',
    'dialect': 'mysql',
    'operatorsAliases': false
  },
  'test': {
    'dialect': 'sqlite',
    'storage': ':memory:',
    'logging': false
  },
  'production': {
    'username': 'root',
    'password': null,
    'database': 'database_production',
    'host': '127.0.0.1',
    'dialect': 'mysql',
    'operatorsAliases': false
  }
};
//# sourceMappingURL=config.js.map