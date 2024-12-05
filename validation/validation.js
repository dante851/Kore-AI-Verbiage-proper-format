const constants = require("../constants");

module.exports = {
  async validateAPIkey(req, res) {
    const apiKey = req.headers["ESI_WRAPPER_SERVICE_API_KEY"] || "";
    if (apiKey === process.env.ESI_WRAPPER_SERVICE_API_KEY) {
      return next();
    } else {
      response = Object.create(constants.serverResponses.unauthorized);
      return res.status(response.status).send(response.body);
    }
  },
};
