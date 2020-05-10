'use strict'

const express = require('express')
const app = express()

const {logger} = require('./logger')
const {customHeaders, httpCodes} = require('./constants')
const {HttpErrorResponse} = require('./utils/HttpErrorResponse')

const {
  createSchemaValidationMiddleware,
} = require('./schemaValidationMiddleware')
const {validatePasteSchema} = require('./PastePersistance/PasteSchema')

const hasValidHeaders = (req, res, next) => {
  if (!req.get(customHeaders.simplePasteApplication)) {
    const httpCode = httpCodes.BAD_REQUEST
    const errorResponse = HttpErrorResponse(
      httpCode,
      'Invalid Request! Missing headers!'
    )
    logger.info(
      `Bad request ${req.path}; Missing header: ${customHeaders.simplePasteApplication}`
    )

    return res.status(httpCode).json(errorResponse)
  }

  return next()
}

app.use(hasValidHeaders)
app.use(express.json())

app.get('/paste/:resourceId', (req, res) => {
  const {resourceId} = req.params
  logger.debug(`GET paste with resourceId: ${resourceId}`)

  res.status(httpCodes.OK).json({
    pasteContent: 'Hello this is a paste downloaded from the backend',
  })
})

const pasteMiddleware = createSchemaValidationMiddleware(validatePasteSchema)
app.post('/paste', pasteMiddleware, (req, res) => {
  logger.info(`Got POST /paste - with: ${JSON.stringify(req.body)}`)
  res.status(201).send('lol')
})

module.exports = {
  app,
}
