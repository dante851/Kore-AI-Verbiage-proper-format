var Application = require("./lib/app");
var Server = require("./lib/server");
var sdk = require("./lib/sdk");
var config = require("./config");
var app = new Application(null, config);
var server = new Server(config, app);
const ESICustomBotActionService = require("./service/ESICustomBotActionService");
verbiage_En_RespData = await ESICustomBotActionService.getVerbiageResponse("ESI_PHA_BOT_RESP_BUILDER_EN_CA.xlsx");
verbiage_Fr_RespData = await ESICustomBotActionService.getVerbiageResponse("ESI_PHA_BOT_RESP_BUILDER_FR_CA.xlsx");
sdk.checkNodeVersion();
server.start();

sdk.registerBot(require("./SimpleConversationalBot.js"));
