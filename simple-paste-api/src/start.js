'use strict'

const {app} = require('./app')
const {logger} = require('./logger')

const gracefullyStopServer = (server) => {
  return () => {
    logger.info('Stopping server...')
    server.close(() => {
      logger.info('Express server shutdown.')
    })
  }
}

const startServer = (port) => {
  logger.info('Starting server...')
  const server = app.listen(port, () => {
    logger.info(`Server listening on port ${port}`)
  })

  process.on('SIGTERM', gracefullyStopServer(server))
  process.on('SIGINT', gracefullyStopServer(server))
}

module.exports = {
  startServer,
}
