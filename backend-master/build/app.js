"use strict";

var _application = _interopRequireDefault(require("./config/application"));

var _index = _interopRequireDefault(require("./routes/index"));

var _person = _interopRequireDefault(require("./routes/person"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setting router
var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var morgan = require('morgan');

var cors = require('cors');

var app = express(); // setting Log

var winston = require('./config/winston'); // view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(morgan('combined', {
  stream: winston.stream
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // set header

app.use(cors({
  'allowedOrigin': _application.default.cors.allowedOrigin,
  'allowedMethods': _application.default.cors.allowedMethods,
  'allowedHeaders': _application.default.cors.allowedHeaders,
  'exposedHeaders': _application.default.cors.exposedHeaders,
  'credentials': _application.default.cors.credentials
})); // setting Router

app.use('/', _index.default);
app.use('/person', _person.default); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // add this line to include winston logging

  winston.error("".concat(err.status || 500, " - ").concat(err.message, " - ").concat(req.originalUrl, " - ").concat(req.method, " - ").concat(req.ip)); // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
//# sourceMappingURL=app.js.map