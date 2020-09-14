'use strict'

const assert = require('assert')

const {ALLOWED_PERSISTANCE_DURATION} = require('./constants')

const {validatePasteSchema} = require('./PasteSchema')

describe('PasteSchema', () => {
  describe('Given a valid new paste data', () => {
    it('Should return true', async () => {
      // given
      const pasteData = {
        pasteContent: 'This is just a test',
        pastePersistance: 15,
      }
      // when
      const validationResult = await validatePasteSchema(pasteData)
      // then
      assert.strictEqual(validationResult, true)
    })
  })

  describe('Given a invalid new paste data', () => {
    it('Should return false when pasteContent is empty', async () => {
      // given
      const pasteData = {
        pasteContent: '',
        pastePersistance: 15,
      }
      // when
      const validationResult = await validatePasteSchema(pasteData)
      // then
      assert.strictEqual(validationResult, false)
    })

    it('Should return false when pastePersistance is not among allowed values', async () => {
      // given
      const pastePersistance = 2137
      assert.ok(!ALLOWED_PERSISTANCE_DURATION.includes(pastePersistance)) // Make sure that the test data ia valid :)
      const pasteData = {
        pasteContent: 'This is just a test',
        pastePersistance: pastePersistance,
      }
      // when
      const validationResult = await validatePasteSchema(pasteData)
      // then
      assert.strictEqual(validationResult, false)
    })
  })
})
