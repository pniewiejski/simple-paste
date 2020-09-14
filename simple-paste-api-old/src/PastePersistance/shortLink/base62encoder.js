'use strict'

const CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
  ''
)

const reverseString = (str) => [...str].reverse().join('')

const encode = (integerNumber) => {
  let number = integerNumber
  if (number === 0) {
    return CHARSET[0]
  }

  let result = ''
  while (number > 0) {
    result += CHARSET[number % 62]
    number = Math.floor(number / 62)
  }

  return reverseString(result)
}

module.exports = {
  encode,
}
