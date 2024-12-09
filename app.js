var Application = require("./lib/app");
var Server = require("./lib/server");
var sdk = require("./lib/sdk");
var config = require("./config");
var app = new Application(null, config);
var server = new Server(config, app);
const {verbiageBuilder} = require("./verbiageBuilder");
const constants = require('./constants/index');
sdk.checkNodeVersion();
server.start();

constants.excelResponse.verbiage_En_RespData = verbiageBuilder("ESI_PHA_BOT_RESP_BUILDER_EN_CA.xlsx");
constants.excelResponse.verbiage_Fr_RespData = verbiageBuilder("ESI_PHA_BOT_RESP_BUILDER_FR_CA.xlsx");


sdk.registerBot(require("./SimpleConversationalBot.js"));
