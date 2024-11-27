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
    var aud = req.body.aud || "https://idproxy.kore.com/authorize";

    var options = {
      iat: new Date().getTime(),
      exp: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
      aud: aud,
      iss: clientId,
      sub: identity,
      isAnonymous: isAnonymous,
    };
    var token = jwt.sign(options, clientSecret);
    res.send({ jwt: token });
  },
};
