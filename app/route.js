const express = require("express"),
  Controller = require("./controllers/controller");

var router = express.Router();

router.post("/dsp/rand", Controller.handleDspWithRandomBidPrice);

router.post("/dsp/high", Controller.handleDspWithHigherBidPrice);

router.post("/dsp/low", Controller.handleDspWithLowerBidPrice);

router.post("/dsp/error", Controller.handleDspWithWrongBidResponse);

router.post("/dsp/:offerPrice", Controller.handleDspWithSpecificBidPrice);

router.get("/winNotice", Controller.verifyWin);

module.exports = router;
