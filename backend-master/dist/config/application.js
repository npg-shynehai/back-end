"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  page: {
    max: 100,
    min: 0,
    default: 10
  },
  folder: {
    logDir: 'logs'
  },
  file: {
    filename: '/report-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    handleExceptions: true,
    maxSize: '20m',
    maxFiles: '14d'
  },
  cors: {
    allowedOrigin: '*',
    allowedMethods: 'GET,POST,PUT,OPTIONS,DELETE,PATCH',
    allowedHeaders: ['Accept', 'Authorization', 'Content-Type', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Authorization', 'Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true
  }
};
exports.default = _default;