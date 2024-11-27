var Application = require("./lib/app");
var Server = require("./lib/server");
var sdk = require("./lib/sdk");
var config = require("./config");
var app = new Application(null, config);
var server = new Server(config, app);
const express = require('express');
const appVerbiage = express();
const customBotActionRoutes = require("./routes/ESICustomBotActionRoutes/ESICustomBotActionRoutes")
appVerbiage.use("/api/custom-bot-action", customBotActionRoutes);
sdk.checkNodeVersion();
server.start();

sdk.registerBot(require("./SimpleConversationalBot.js"));
