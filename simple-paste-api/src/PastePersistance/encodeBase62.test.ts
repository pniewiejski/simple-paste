import assert from 'assert'

import encodeBase62 from './encodeBase62'

describe('base62encoder', () => {
  describe('Encode integer values', () => {
    const TEST_DATA = [
      {inputValue: 238327, expectedResult: 'ZZZ'},
      {inputValue: 9999, expectedResult: '2Bh'},
      {inputValue: 0, expectedResult: '0'},
      {inputValue: 12345, expectedResult: '3d7'},
      {inputValue: 1590937841845, expectedResult: 's0zX3dH'},
    ]
    TEST_DATA.forEach(({inputValue, expectedResult}) => {
      it(`Should encode the value ${inputValue} to ${expectedResult}`, () => {
        const result = encodeBase62(inputValue)

        assert.strictEqual(result, expectedResult)
      })
    })
  })
})