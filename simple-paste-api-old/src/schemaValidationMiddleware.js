'use strict'

const {httpCodes} = require('./constants')
const {HttpErrorResponse} = require('./utils/HttpErrorResponse')

const createSchemaValidationMiddleware = (schemaValidator) => {
  return async (req, res, next) => {
    const body = req.body

    const isSchemaValid = await schemaValidator(body)
    if (!isSchemaValid) {
      const httpCode = httpCodes.BAD_REQUEST
      const error = HttpErrorResponse(httpCode, 'Invalid schema')

      return res.status(httpCode).json(error)
    }

    return next()
  }
}

module.exports = {
  createSchemaValidationMiddleware,
}
