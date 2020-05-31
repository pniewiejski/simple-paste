'use strict'

const base62encoder = require('./base62encoder')

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const generateShortLink = async () => {
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      const timestamp = Date.now().toString()

      let encoded = base62encoder.encode(timestamp)
      encoded += base62encoder.encode(getRandomInt(1000))
      resolve(encoded)
    })
  })
}

module.exports = {
  generateShortLink,
}
