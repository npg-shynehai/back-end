import * as _FS from 'fs'
import AppConf from './application'
import * as winston from 'winston'

require('winston-daily-rotate-file')

// kiểm tra nếu tồn tại
if (!_FS.existsSync(AppConf.folder.logDir)) {
  _FS.mkdirSync(AppConf.folder.logDir)
}

// Cấu hình file log
var transport = new (winston.transports.DailyRotateFile)({

  filename: `${AppConf.folder.logDir}`.concat(AppConf.file.filename),
  datePattern: AppConf.file.datePattern,
  zippedArchive: AppConf.file.zippedArchive,
  handleExceptions: AppConf.file.handleExceptions,
  maxSize: AppConf.file.maxSize,
  maxFiles: AppConf.file.maxFiles
})

transport.on('rotate', function (oldFilename, newFilename) {
  // do something fun
  console.log(new Date(), oldFilename, newFilename)
})

var logger = winston.createLogger({
  transports: [
    transport
  ],
  exitOnError: false
})

logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message)
  }
}

module.exports = logger
