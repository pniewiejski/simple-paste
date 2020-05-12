import React from 'react'
import {render, wait} from '@testing-library/react'

import PastePreview from './PastePreview'

describe('PastePreview', () => {
  it('Should fetch and present a paste content when provided with valid paste id', () => {
    // given
    const mockedPasteId = 'dummy-hash'
    const mockedPasteContent = "This is a dummy paste content"
    const getPasteById = resourceId => Promise.resolve({
      pasteContent: mockedPasteContent,
      pastePersistance: 15
    })

    // when
    const {getByText} = render(<PastePreview getPasteById={getPasteById} resourceId={mockedPasteId} />)

    // then
    wait(() => {
      expect(getByText(mockedPasteContent)).not.toEqual(null)
    })
  })
})