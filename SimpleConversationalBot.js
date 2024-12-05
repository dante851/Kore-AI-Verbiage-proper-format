var botId = "st-ae29b86a-53b5-570a-93b9-7fdb0510f76d";
var botName = "ordermanage";
var sdk = require("./lib/sdk");
const { populateBotResponse } = require("./utility");
const { resetExcelData } = require("./utility");
const constants = require('./constants/index');
const {logFn} = require('./winston_config');
/*
 * This is the most basic example of BotKit.
 *
 * It showcases how the BotKit can intercept the message being sent to the bot or the user.
 *
 * We can either update the message, or chose to call one of 'sendBotMessage' or 'sendUserMessage'
 */
module.exports = {
  botId: botId,
  botName: botName,

  on_user_message: function (requestId, data, callback) {
    if (data.message === "Hi") {
      data.message = "Hello";
      //Sends back 'Hello' to user.
      return sdk.sendUserMessage(data, callback);
    } else if (!data.agent_transfer) {
      //Forward the message to bot
      return sdk.sendBotMessage(data, callback);
    } else {
      data.message = "Agent Message";
      return sdk.sendUserMessage(data, callback);
    }
  },
  on_bot_message: function (requestId, data, callback) {
     resetExcelData();
    if (data.message === "hi") {
      data.message = "The Bot says hello!";
      console.log("bot message", data.message);
    }
    data.message !== undefined ? logFn.info(`${data.message}`) : logFn.info(`message under progress`) ;
    // console.log("verbiage_builder_resp", constants.verbiage_En_RespData);
    //Sends back the message to user
    const currentLanguage = data.context.currentLanguage;
    const verbiageBuilderData =
      currentLanguage === "fr" ? constants.verbiage_Fr_RespData : constants.verbiage_En_RespData;
    data.message = populateBotResponse(
      verbiageBuilderData,
      data.message,
      data.context.session.BotUserSession
    );
    
    data.overrideMessagePayload = {
      body: JSON.stringify(data.message),
      isTemplate: true
    };
    console.log("overrideMessagePayload", data.overrideMessagePayload);
    console.log("bot message", data.message);
    return sdk.sendUserMessage(data, callback);
  },
  on_agent_transfer: function (requestId, data, callback) {
    return callback(null, data);
  },
  on_event: function (requestId, data, callback) {
    console.log("on_event -->  Event : ", data.message);
    return callback(null, data);
  },
  on_alert: function (requestId, data, callback) {
    console.log("on_alert -->  : ", data, data.message);
    return sdk.sendAlertMessage(data, callback);
  },
};
