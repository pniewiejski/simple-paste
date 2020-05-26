const API_ROOT = '/api' // Same origin proxy

const HTTP_BAD_REQUEST = 400
const HTTP_OK_CREATED = 201

// TODO: Add error handling
const requests = {
  get: (url) => fetch(`${API_ROOT}${url}`),
  post: (url, data) =>
    fetch(`${API_ROOT}${url}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    }),
}

// eslint-disable-next-line import/prefer-default-export
export const Paste = {
  getById: (resourceId) =>
    requests.get(`/paste/${resourceId}`).then((response) => response.json()),
  create: (pasteData) =>
    requests.post('/paste', pasteData).then(async (response) => {
      const httpCode = response.status
      const result = await response.json()

      switch (httpCode) {
        case HTTP_OK_CREATED:
          return result
        case HTTP_BAD_REQUEST:
          throw new Error(`${result.message}`)
        default:
          throw new Error('Something went wrong please try again')
      }
    }),
}
