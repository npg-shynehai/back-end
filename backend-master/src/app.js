import AppConf from './config/application'

// setting router
import indexRouter from './routes/index'
import personRouter from './routes/person'
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// setting Log
var winston = require('./config/winston')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(morgan('combined', { stream: winston.stream }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// set header
app.use(cors({
  'allowedOrigin': AppConf.cors.allowedOrigin,
  'allowedMethods': AppConf.cors.allowedMethods,
  'allowedHeaders': AppConf.cors.allowedHeaders,
  'exposedHeaders': AppConf.cors.exposedHeaders,
  'credentials': AppConf.cors.credentials
}))

// setting Router
app.use('/', indexRouter)
app.use('/person', personRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
