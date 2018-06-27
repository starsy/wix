
const winston = require('winston');
const config = winston.config;

const path = require('path');

const moment = require('moment')

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const logger = winston.createLogger({
  //level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} ${info.level}: ${info.message}`)
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    //new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //new winston.transports.File({ filename: 'combined.log' })
    new winston.transports.Console()
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  //log.add(getConsoleTransport());
}

// pass in function arguments object and returns string with whitespaces
function argumentsToString(v) {
  // convert arguments object to real array
  let args = Array.prototype.slice.call(v);
  for (let k in args) {
    if (typeof args[k] === "object") {
      // args[k] = JSON.stringify(args[k]);
      args[k] = require('util').inspect(args[k], false, null, true);
    }
  }
  let str = args.join(" ");
  return str;
}

const loglevelInt = logger.levels[logger.level]

module.exports = function (component) {
  component = path.basename(component).split(".")[0].capitalizeFirstLetter();

  // wrapping the winston function to allow for multiple arguments
  let wrap = {};
  wrap.component = component
  wrap.info = function () {
    if (loglevelInt < logger.levels['info']) {
      return // do nothing
    }
    logger.log.apply(logger, ["info", component + ": " + argumentsToString(arguments)]);
  };

  wrap.error = function () {
    if (loglevelInt < logger.levels['error']) {
      return // do nothing
    }
    logger.log.apply(logger, ["error", component + ": " + argumentsToString(arguments)]);
  };

  wrap.warn = function () {
    if (loglevelInt < logger.levels['warn']) {
      return // do nothing
    }
    logger.log.apply(logger, ["warn", component + ": " + argumentsToString(arguments)]);
  };

  wrap.debug = function () {
    if (loglevelInt < logger.levels['debug']) {
      return // do nothing
    }
    logger.log.apply(logger, ["debug", component + ": " + argumentsToString(arguments)]);
  };
  return wrap;
};
