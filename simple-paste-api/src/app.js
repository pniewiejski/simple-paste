'use strict'

const express = require('express')
const app = express()

const {logger} = require('./logger')
const {customHeaders, httpCodes} = require('./constants')
const {HttpErrorResponse} = require('./utils')

const isValidRequest = (req, res, next) => {
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

app.use(isValidRequest)
app.use(express.json())

app.get('/paste/:resourceId', (req, res) => {
  const resourceId = req.param('resourceId')
  logger.debug(`GET /paste/${resourceId}`)

  res.status(httpCodes.OK).json({
    pasteContent: 'Hello this is a paste downloaded from the backend',
  })
})

module.exports = {
  app,
}
