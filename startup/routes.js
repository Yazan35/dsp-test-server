// API Endpoint
const bodyParser = require("body-parser"),
  morgan = require("morgan"),
  cookieParser = require("cookie-parser"),
  cors = require("cors"),
  helmet = require("helmet"),
  logger = require("../libs/logger");

const endPoint = require("../app/route");

module.exports = function(app) {
  // allow access origin
  app.use(cors());

  // to protect the app from well-known web vulnerabilities
  app.use(helmet());

  // Body Parser, logger,Cookie Parser
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    logger.info("Morgan enabled ...");
  }
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());

  // routers
  app.use("/", endPoint);

  app.use("*", (req, res) => {
    return res.status(404).json({
      success: 0,
      message: "route not found"
    });
  });

  // app.use(error);
};
