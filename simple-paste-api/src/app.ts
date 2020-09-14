import express from 'express'
import logger from './logger'
import {customHeaders, httpCodes} from './constants'
import HttpErrorResponse from './HttpErrorResponse'
import createSchemaValidationMiddleware from './schemaValidationMiddleware'
import {PasteSchemaValidator} from './PastePersistance/PasteSchemaValidator'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  if (!req.get(customHeaders.simplePasteApplication)) {
    const httpCode = httpCodes.BAD_REQUEST
    const errorResponse = HttpErrorResponse(
      httpCode,
      'Invalid Request! Missing headers!'
    )
    logger.info(
      `Bad request ${(req as any).path}; Missing header: ${
        customHeaders.simplePasteApplication
      }`
    )

    return res.status(httpCode).json(errorResponse)
  }

  return next()
})

app.get('/paste/:resourceId', (req, res) => {
  const {resourceId} = req.params // TODO: what if resourceID does not exist?
  logger.debug(`GET paste with resourceId: ${resourceId}`)

  res.status(httpCodes.OK).json({
    pasteContent: 'This is a mocked paste content.\nHello world!',
  })
})

const pasteMiddleware = createSchemaValidationMiddleware(PasteSchemaValidator)
app.post('/paste', pasteMiddleware, (req, res) => {
  logger.info(`Got POST /paste - with: ${JSON.stringify(req.body)}`)
  res
    .status(httpCodes.OK_CREATED)
    .json({message: 'Mocked response: Item saved'})
})

export default app
