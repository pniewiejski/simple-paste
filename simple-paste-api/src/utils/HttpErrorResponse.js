'use strict'

const HttpErrorResponse = (httpCode, message) => {
  return {
    code: httpCode,
    error: message,
  }
}

module.exports = {
  HttpErrorResponse,
}
