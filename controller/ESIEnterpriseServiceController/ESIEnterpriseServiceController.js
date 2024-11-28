/**
 * Summary : Enterprise Service controller
 *
 * Description : Responsible to handle all sort of ESI enterprise service calls.
 *
 * @link   /Enterprise Apis/
 * @author ESI CA BOT Implementation
 */


const MODULE_NAME = 'ESIEnterpriseServiceController';
const constants = require("../../constants/index");
const ESIEnterpriceService = require("../../service/ESIEnterpriseService");

module.exports = {
    /**
   * Get the Id details for the given order / Member Id .
   * @param {*} req  request from route.
   * @param {*} res response to be send to the api
   * @returns the response data
   */
  async getIdDetails(req, res) {
    const FUNC_NAME = `getIdDetails`;
    let response;
    
    try {
      if (req.query.orderId && !req.query.memberId) {
           response = Object.create(constants.serverResponses.success);
        response.body = await ESIEnterpriceService.getOrderDetails(
          req.query.orderId
        );
      } else if (req.query.memberId) {
         response = Object.create(constants.serverResponses.success);
        response.body = await ESIEnterpriceService.getMemberDetails(
          req.query.memberId
        );
      }
    } catch (e) {
      // logger.error(`${MODULE_NAME} :: ${FUNC_NAME} :: `, e);
      console.log(e.toString());
      if(e.statusCode === 404){
        response = Object.create(constants.serverResponses.dataNotFound);
      }else{
        response = Object.create(constants.serverResponses.serverError);
      }
    }
    return res.status(response.status).send(response.body);
  },
}
