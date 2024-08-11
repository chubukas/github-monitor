import winston from "winston";
import path from "path";

const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return stack
    ? `${timestamp} [${level}]: ${stack}`
    : `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    errors({ stack: true }), // Include stack trace for errors
    logFormat
  ),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: `${path.join(__dirname, "../storage/logs/combined.log")}`,
      level: "info",
    }),
    new winston.transports.File({
      filename: `${path.join(__dirname, "../storage/logs/error.log")}`,
      level: "error",
    }), // Separate file for errors
  ],
});

export default logger;
