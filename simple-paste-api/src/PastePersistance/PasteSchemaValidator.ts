import Joi from 'joi'

import logger from '../logger'
import {SchemaValidator} from '../SchemaValidator'

export const ALLOWED_PERSISTANCE_DURATION = [5, 15, 30, 60]

const schema = Joi.object({
  pasteContent: Joi.string().required().min(1),
  pastePersistance: Joi.number()
    .required()
    .valid(...ALLOWED_PERSISTANCE_DURATION),
})

const validate = async (data: object) => {
  try {
    await schema.validateAsync(data)
  } catch (error) {
    logger.debug(
      `Schema error - Validated paste data does not fit the defined schema - ${error.message}`
    )
    return false
  }

  return true
}

export const PasteSchemaValidator: SchemaValidator = {
  validate,
}
