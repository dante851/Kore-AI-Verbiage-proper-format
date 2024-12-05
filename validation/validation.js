const constants = require("../constants");

module.exports = {
  async validateAPIkey(req, res,next) {
    const apiKey = req.headers["esi_wrapper_service_api_key"] || "";
    console.log("process.env.ESI_WRAPPER_SERVICE_API_KEY",process.env.ESI_WRAPPER_SERVICE_API_KEY)
    console.log("apikey",apiKey)
    if (apiKey === process.env.ESI_WRAPPER_SERVICE_API_KEY) {
      return next();
    } else {
      response = Object.create(constants.serverResponses.unauthorized);
      return res.status(response.status).send(response.body);
    }
  },
};
