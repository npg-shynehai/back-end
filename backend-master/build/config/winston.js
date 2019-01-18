"use strict";

var _FS = _interopRequireWildcard(require("fs"));

var _application = _interopRequireDefault(require("./application"));

var winston = _interopRequireWildcard(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

require('winston-daily-rotate-file'); // kiểm tra nếu tồn tại


if (!_FS.existsSync(_application.default.folder.logDir)) {
  _FS.mkdirSync(_application.default.folder.logDir);
} // Cấu hình file log


var transport = new winston.transports.DailyRotateFile({
  filename: "".concat(_application.default.folder.logDir).concat(_application.default.file.filename),
  datePattern: _application.default.file.datePattern,
  zippedArchive: _application.default.file.zippedArchive,
  handleExceptions: _application.default.file.handleExceptions,
  maxSize: _application.default.file.maxSize,
  maxFiles: _application.default.file.maxFiles
});
transport.on('rotate', function (oldFilename, newFilename) {
  // do something fun
  console.log(new Date(), oldFilename, newFilename);
});
var logger = winston.createLogger({
  transports: [transport],
  exitOnError: false
});
logger.stream = {
  write: function write(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};
module.exports = logger;
//# sourceMappingURL=winston.js.map