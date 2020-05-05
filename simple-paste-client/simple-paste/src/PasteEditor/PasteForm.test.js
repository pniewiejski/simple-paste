import React from 'react'
import {render, act, fireEvent, within} from '@testing-library/react'
import {screen} from '@testing-library/dom'
import PasteForm from './PasteForm'

import {PASTE_PERSISTANCE_OPTIONS} from '../constants'

describe('PasteForm', () => {
  it('Should render a form', () => {
    // given
    // when
    const {getByText, getByPlaceholderText, getByTestId} = render(<PasteForm />)
    const textAreaElement = getByPlaceholderText('Paste your text here')
    const buttonElement = getByText('Save My Paste')
    const selectPersistanceElement = getByTestId('test-paste-persistance-select')
    
    // then
    expect(textAreaElement).not.toEqual(null)
    expect(buttonElement).not.toEqual(null)
    expect(selectPersistanceElement).not.toEqual(null)
  })

  describe('When given correct data', () => {
    it('Should post a new Paste', () => {
      // given
      const pasteText = 'Hello world!'
      const persistanceValue = PASTE_PERSISTANCE_OPTIONS[0]
      const postPaste = jest.fn(() => Promise.resolve())

      const {getByText, getByPlaceholderText, getByTestId, getByRole} = render(<PasteForm postPaste={postPaste} />)
      const textAreaElement = getByPlaceholderText('Paste your text here')
      const selectPersistance = getByTestId('test-paste-persistance-select')
      const buttonElement = getByText('Save My Paste')

      // when
      act(() => {fireEvent.change(textAreaElement, { target: { value: pasteText }})})
      
      // 🙈 This piece bellow is an awefull hack to pick an option from material ui Select with native=false
      const selectPersistanceElementInnerQueries = within(selectPersistance) // get queries to search within this piece
      const selectPersistanceElementInnerButton = selectPersistanceElementInnerQueries.getByRole('button')
      act(() => { fireEvent.mouseDown(selectPersistanceElementInnerButton) })

      const listbox = within(getByRole('listbox'))
      const persistanceValueOption = listbox.getByText(`${persistanceValue}`)
      screen.debug(persistanceValueOption)
      act(() => { fireEvent.click(persistanceValueOption) })
      // 🙈It's over! The dragon is gone and you can open your eyes again!

      act(() => { fireEvent.click(buttonElement)} )
      screen.debug()
      
      // then
      expect(postPaste).toHaveBeenCalledTimes(1)
    })
  })

  describe('When given incorrect data', () => {
    it('Should not allow to post a paste', () => {
      // TODO 😅
    })
  })
})
