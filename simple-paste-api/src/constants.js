'use strict'

const httpCodes = {
  OK: 200,
  OK_CREATED: 201,
  OK_NO_CONTENT: 204,
  BAD_REQUEST: 400,
}

const customHeaders = {
  simplePasteApplication: 'X-Simple-Paste',
}

module.exports = {
  httpCodes,
  customHeaders,
}
