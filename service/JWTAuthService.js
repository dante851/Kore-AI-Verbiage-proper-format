const config = require("../config.json")
module.exports = {
  /**
   * Create the JWT Token using the required details.
   * @param {*} req the request object.
   * @returns the token.
   */
  async generateToken() {
    var identity = config.credentials.identity;
    var clientId = config.credentials.appId;
    var clientSecret = config.credentials.apikey;
    var isAnonymous = config.app.isAnonymous || false;
    var aud = "https://idproxy.kore.com/authorize";

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
