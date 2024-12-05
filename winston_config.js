const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const DailyRotateFile = require("winston-daily-rotate-file");

//create function
const log = (logLevel, currentFileName, currentMethodName, logText) => {
  let logMsg = ` ${currentFileName} --> ${currentMethodName} : ${logText}`;
  console.log("log initiated");
  if (logLevel === "info") {
    console.log(logLevel);
    logger.info(logMsg);
  } else if (logLevel === "error") logger.error(logMsg);
  else if (logLevel === "warn") logger.warn(logMsg);
  else console.log("else");
};

// Define the log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: "info", // Set the default logging level
  format: combine(timestamp(), logFormat),
  transports: [
    new DailyRotateFile({
      filename: "logs/app-%DATE%.log", // Log file name pattern
      datePattern: "YYYY-MM-DD", // Daily rotation based on date
      zippedArchive: true, // Optionally compress the logs
      maxSize: "20m", // Maximum size of the log file before rotation
      maxFiles: "14d", // Keep logs for the last 14 days
    }),
  ],
});

// Add console transport for development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(timestamp(), logFormat),
    })
  );
}

// Example usage
logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");

// module.exports = logger;

module.exports = log;
