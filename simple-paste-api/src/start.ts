import {Server} from 'http'
import logger from './logger'
import app from './app'

const gracefullyStopServer = (server: Server) => {
  return () => {
    logger.info('Stopping server...')
    server.close(() => {
      logger.info('Express server shutdown.')
    })
  }
}

export default (port: number) => {
  logger.info('Starting server...')
  const server = app.listen(port, () => {
    logger.info(`Server listening on port ${port}`)
  })

  process.on('SIGTERM', gracefullyStopServer(server))
  process.on('SIGINT', gracefullyStopServer(server))
}
