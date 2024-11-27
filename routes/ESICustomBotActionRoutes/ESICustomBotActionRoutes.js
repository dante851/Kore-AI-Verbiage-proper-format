/**
 * Summary : Custom Bot Action Routes file
 *
 * Description : This file is created for all routes for Custom Bot Action module
 * Also Responsible to handle all sort of custom bot actions such as verbiage builder, custom logging, custom KPIs.
 *
 * @link   /Enterprise Routes/
 * @author ESI CA Bot Implementation
 */

var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const ESICustomBotActionController = require("../../controller/ESICustomBotActionController/ESICustomBotActionController");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/verbiageBuilder", ESICustomBotActionController.getVerbiageData);
module.exports = router;
