const config = require("config"),
  logger = require("../libs/logger"),
  MongoClient = require("mongodb").MongoClient;

const DB_URL = config.get("dbConfig.url"),
  DB_NAME = config.get("dbConfig.name"),
  POOL_SIZE = config.get("dbConfig.poolSize");

let _dbClient = null;

module.exports = {
  /**
   * Get the database object
   *
   * @returns dbObject
   */
  getDbObject: async function () {
    if (!_dbClient || !_dbClient.db(DB_NAME).serverConfig.isConnected()) {
      _dbClient = await MongoClient.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        poolSize: POOL_SIZE
      });
      logger.info("=> connected to database");
    }

    return _dbClient.db(DB_NAME);
  },
  /**
   * Close the database connection
   */
  closeDb: async function () {
    if (_dbClient) {
      await _dbClient.close();
    }
  }
};
