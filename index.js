// init process configuration
process.env.NODE_CONFIG_DIR = __dirname + "/config/";

const express = require("express"),
  config = require("config"),
  dbAdapter = require("./core/dbAdapter"),
  logger = require("./libs/logger");

var app = express();

require("./startup/logging")();
require("./startup/routes")(app);

/**
 * Log error and terminate the process
 *
 * @param {Error} err
 */
async function handleError(err) {
  logger.error(err);
  await dbAdapter.closeDb();
  process.exit(1);
}

process.on("uncaughtException", handleError);

process.on("unhandledRejection", handleError);

process.on("SIGINT", handleError);

let PORT = config.get("serverConfig.port") || 3001;

const server = app.listen(PORT, async function(err) {
  if (err) {
    await handleError(err);
  } else {
    logger.info("Server is Starting");
    console.log(`[${process.pid}] Server is starting .... 0.0.0.0:${PORT}`);
  }
});

module.exports = server;
