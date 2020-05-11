'use strict'

const winston = require('winston')
const path = require('path')

// TODO: Add this to config
const logsDir = './logs'

/**
 * Custom log format used in Console
 */
const myFormat = winston.format.printf((info) => {
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
      filename: path.join(logsDir, 'combined.log'),
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      handleExceptions: true,
    }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), myFormat),
      level: 'debug',
      handleExceptions: true,
      silent: process.env.NODE_ENV === 'test',
    })
  )
}

module.exports = {logger}
