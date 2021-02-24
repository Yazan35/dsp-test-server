const winston = require("winston"),
  config = require('config');

const LOGSTASH_HOST = config.get('logstashConfig.host'),
  LOGSTASH_PORT = config.get('logstashConfig.port');

module.exports = {
  /**
   * Create the logging object based on enviroment mode.
   *
   * @param {String} logDir - directory path as String
   */
  init: function (logDir) {
    if (process.env.NODE_ENV !== "production") {
      winston.loggers.add('development', {
        format: winston.format.simple(),
        transports: [new winston.transports.Console()]
      });
    } else {
      winston.loggers.add('production', {
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [
          new winston.transports.File({ filename: logDir + "/error.log", level: "error" }),
          new winston.transports.File({ filename: logDir + "/combined.log", level: "info" })
        ]
      });
      winston.loggers.add('logstash', {
        transports: [
          new winston.transports.Http({ host: LOGSTASH_HOST, port: LOGSTASH_PORT })
        ]
      });
    }
  },
  /**
   * This function print logging with info level.
   *
   * @param {String} message - input
   */
  info: function (message) {
    winston.loggers.get(process.env.NODE_ENV).info(message);
  },
  /**
   * This function print logging with error level.
   *
   * @param {Error} err - Error object
   */
  error: function (err) {
    if (process.env.NODE_ENV === "production") {
      winston.loggers.get('production').error(err.message);
    } else {
      winston.loggers.get('development').error(err.stack);
    }
  },
  /**
   * 
   */
  logstashInfo: function (message) {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    winston.loggers.get('logstash').info(message);
  }
};
