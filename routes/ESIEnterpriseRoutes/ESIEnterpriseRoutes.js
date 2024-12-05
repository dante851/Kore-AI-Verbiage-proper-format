/**
 * Summary : Enterprise Routes file
 *
 * Description : This file is created for all routes for Enterprise module
 * Also Responsible to handle all sort of ESI enterprise service calls.
 *
 * @link   /Enterprise Routes/
 * @author ESI CA Bot Implementation
 */

const router = require("express").Router();
var jwt = require("jsonwebtoken");
const ESIEnterpriseServiceController = require("../../controller/ESIEnterpriseServiceController/ESIEnterpriseServiceController");
const apiValidation = require("../../validation/validation");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  console.log("request",req.headers)
  next();
});

router.get(
  "/getIdDetails",
  apiValidation.validateAPIkey,
  ESIEnterpriseServiceController.getIdDetails
);

module.exports = router;
