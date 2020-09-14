import {RequestHandler} from 'express'
import {httpCodes} from './constants'
import HttpErrorResponse from './HttpErrorResponse'
import {SchemaValidator} from './SchemaValidator'

export default (schemaValidator: SchemaValidator): RequestHandler => {
  return async (req, res, next) => {
    const {body} = req

    const isSchemaValid = await schemaValidator.validate(body)
    if (!isSchemaValid) {
      const httpCode = httpCodes.BAD_REQUEST
      const error = HttpErrorResponse(httpCode, 'Invalid schema')

      return res.status(httpCode).json(error)
    }

    return next()
  }
}
