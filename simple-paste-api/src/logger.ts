import winston from 'winston'
import {join} from 'path'

const LOGS_DIR = './logs'

const format = winston.format.printf((info) => {
  return `${info.timestamp} [${info.level}]: ${info.message}`
})

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: join(LOGS_DIR, 'combined.log'),
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: join(LOGS_DIR, 'error.log'),
      level: 'error',
      handleExceptions: true,
    }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), format),
      level: 'debug',
      handleExceptions: true,
      silent: process.env.NODE_ENV === 'test',
    }),
  ],
})

export default logger
