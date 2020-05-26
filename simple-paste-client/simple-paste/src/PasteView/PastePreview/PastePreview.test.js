import React from 'react'
import {render, wait} from '@testing-library/react'

import PastePreview from './PastePreview'

describe('PastePreview', () => {
  it('Should fetch and present a paste content when provided with valid paste id', () => {
    // given
    const mockedPasteId = 'dummy-hash'
    const mockedPasteContent = 'This is a dummy paste content'
    const getPasteById = (resourceId) =>
      Promise.resolve({
        pasteContent: mockedPasteContent,
        pastePersistance: 15,
      })

    // when
    const {getByText} = render(
      <PastePreview getPasteById={getPasteById} resourceId={mockedPasteId} />,
    )

    // then
    wait(() => {
      expect(getByText(mockedPasteContent)).not.toEqual(null)
    })
  })

  describe('When a paste could not be fetched from backend', () => {
    it('Should render a toast with error an message', () => {
      // given
      const mockedPasteId = 'dummy-hash'
      const expectedErrorMessage = `Could not find a paste: ${mockedPasteId}! Are you sure it exists?`
      const getPasteById = (resourceId) => Promise.reject()

      // when
      const {getByText} = render(
        <PastePreview getPasteById={getPasteById} resourceId={mockedPasteId} />,
      )

      // then
      wait(() => {
        expect(getByText(expectedErrorMessage)).not.toEqual(null)
      })
    })
  })
})
