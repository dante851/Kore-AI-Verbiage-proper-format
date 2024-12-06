var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  /**
   * Create the JWT Token using the required details.
   * @param {*} req the request object.
   * @returns the token.
   */
  async generateToken(req) {
    var identity = req.body.identity;
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var isAnonymous = req.body.isAnonymous || false;
    var aud = req.body.aud || process.env.KORE_AI_TOKEN_GENERATION_URL;

    var options = {
      iat: new Date().getTime(),
      exp: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
      aud: aud,
      iss: clientId,
      sub: identity,
      isAnonymous: isAnonymous,
    };
    var token = jwt.sign(options, clientSecret);
    return { jwt: token };
  },
};
