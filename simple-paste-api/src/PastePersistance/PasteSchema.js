'use strict'

const Joi = require('@hapi/joi')

const {logger} = require('../logger')

const {ALLOWED_PERSISTANCE_DURATION} = require('./constants')

const PasteSchema = Joi.object({
  pasteContent: Joi.string().required().min(1),
  pastePersistance: Joi.number()
    .required()
    .valid(...ALLOWED_PERSISTANCE_DURATION),
})

const validatePasteSchema = async (data) => {
  try {
    await PasteSchema.validateAsync(data)
  } catch (error) {
    logger.debug(
      `Schema error - Validated paste data does not fit the defined schema - ${error.message}`
    )
    return false
  }

  return true
}

module.exports = {
  PasteSchema,
  validatePasteSchema,
}
