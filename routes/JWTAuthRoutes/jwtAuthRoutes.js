/**
 * Summary : JWT Auth Routes file
 *
 * Description : This file is created for all routes for JWT Auth module
 * Also Responsible to handle kore.ai provided web/mobile sdk client app requests for JWT authentication.
 *
 * @link   /JWT Auth Routes/
 * @author ESI CA Bot Implementation
 */

const router = require("express").Router();
var jwt = require("jsonwebtoken");
const {
  getJWTToken,
} = require("../../controller/JWTAuthServiceController/JWTAuthServiceController");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/jwtToken", getJWTToken);

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
