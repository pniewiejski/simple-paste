# SimplePaste API Server

## Configuration

Configuration is done using environment variables.

- `PORT` - set the port on which the server is listening. If the environment variable is not
  specified, the default port is 3000.
- `NODE_ENV` - depending on its value we get different behavior of logger (For more details see
  [`./src/logger.js`](./src/logger.js))
