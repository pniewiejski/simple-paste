const API_ROOT = '/api' // Same origin proxy

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
  create: (pasteData) => requests.post('/paste', pasteData),
}
