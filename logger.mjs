// logger.mjs
import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: 'info', // Adjust the log level as needed
    format: format.combine(
        format.colorize(),
        format.simple()
    ),
    transports: [
        new transports.Console(),
    ],
});

export {logger}
