/**
 * Summary : ESI Custom Bot Action Controller
 *
 * Description : Responsible to handle all sort of custom bot actions such as verbiage builder, custom logging, custom KPIs
 *
 * @link   /Custom Bot Action Apis/
 * @author ESI CA BOT Implementation
 */

const MODULE_NAME = "ESICustomBotActionController";
const fs = require('fs');
const constants = require("../../constants/index");
const ESICustomBotActionService = require("../../service/ESICustomBotActionService");
// const ENfilePath = '../../ESI_PHA_BOT_RESP_BUILDER_EN_CA.xlsx';
// const FRfilePath = '../../ESI_PHA_BOT_RESP_BUILDER_FR_CA.xlsx';
const path = require('path');

// Get the directory path
// const EN_FILE = fs.readFileSync(path.dirname(ENfilePath));
// const FR_FILE = fs.readFileSync(path.dirname(FRfilePath));
module.exports = {
  /**
   * Get the Verbiage details from the database.
   * @param {*} req  request from route.
   * @param {*} res response to be send to the api
   * @returns the response
   */
  async getVerbiageData(req, res) {
    const FUNC_NAME = `getVerbiageData`;
    let response;
    try {
      const language = req.body.currentLang || "en";
    verbiage_En_RespData = await ESICustomBotActionService.getVerbiageResponse("ESI_PHA_BOT_RESP_BUILDER_EN_CA.xlsx");
    verbiage_Fr_RespData = await ESICustomBotActionService.getVerbiageResponse("ESI_PHA_BOT_RESP_BUILDER_FR_CA.xlsx");
      const verbiageBuilderData =
        language === "fr" ? verbiage_Fr_RespData : verbiage_En_RespData;
    //   let result = verbiageBuilderData.filter(
    //     (ele) => ele.RESPONSE_ID === req.body.responseId
    //   );
      response = Object.create(constants.serverResponses.success);
      response.body = verbiageBuilderData;
    } catch (e) {
      // logger.error(`${MODULE_NAME} :: ${FUNC_NAME} :: `, e);
      response = Object.create(constants.serverResponses.serverError);
    }
    return res.status(response.status).send(response.body);
  },
};
