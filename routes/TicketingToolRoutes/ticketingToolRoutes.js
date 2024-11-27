/**
 * Summary : Ticketing Tool Routes file
 *
 * Description : This file is created for all routes for ticketing tool module
 * Also Responsible to handle all sort of unattended user queries as tickets in external ticketing tool system such as servicenow etc.
 *
 * @link   /Ticketing ToolRoutes/
 * @author ESI CA Bot Implementation
 */

const router = require("express").Router();
var jwt = require("jsonwebtoken");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

module.exports = router;
