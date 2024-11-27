const winston = require("winston");
const { combine, timestamp, json } = winston.format;
const path = require("path");
const datetime = new Date();
exports.logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      format: combine(timestamp(), json()),
      filename: path.resolve(__dirname,`./logs/${datetime.toISOString().slice(0,10)}.log`),
    }),
  ],
});
    
  