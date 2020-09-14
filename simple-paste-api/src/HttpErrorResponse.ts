interface ErrorResponse {
  code: number
  error: string
}

const HttpErrorResponse = (
  httpCode: number,
  message: string
): ErrorResponse => {
  return {
    code: httpCode,
    error: message,
  }
}

export default HttpErrorResponse
