/**
 * Summary : Enterprise Routes file
 *
 * Description : This file is created for all routes for Enterprise module
 * Also Responsible to handle all sort of ESI enterprise service calls.
 *
 * @link   /Enterprise Routes/
 * @author ESI CA Bot Implementation
 */

var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const ESIEnterpriseService = require("../../service/ESIEnterpriseService");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/verbiageBuilder", ESICustomBotActionController.getVerbiageData);

module.exports = router;
