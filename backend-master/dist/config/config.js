"use strict";

module.exports = {
  'development': {
    'username': 'root',
    'password': '123',
    'database': 'database_development',
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
    'username': 'b21a832c6027c9',
    'password': 'a3beb530',
    'database': 'heroku_0506b6b683b840a',
    'host': 'eu-cdbr-west-02.cleardb.net',
    'dialect': 'mysql',
    'operatorsAliases': false
  }
};