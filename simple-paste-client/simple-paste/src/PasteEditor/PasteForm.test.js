import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'

import PasteForm from './PasteForm'

import {PASTE_PERSISTANCE_OPTIONS} from '../constants'

const getFormFields = (container) => {
  const pasteTextField = container.querySelector(
    'textarea[name="pasteContent"]',
  )
  const persistanceTimeOption = container.querySelector(
    'input[name="pastePersistance"]',
  )
  const submitButton = container.querySelector('button[type="submit"]')

  return [pasteTextField, persistanceTimeOption, submitButton]
}

const fillForFields = (container, {pasteText, persistanceValue}) => {
  const [pasteTextField, persistanceTimeOption, submitButton] = getFormFields(
    container,
  )

  fireEvent.change(pasteTextField, {target: {value: pasteText}})
  fireEvent.change(persistanceTimeOption, {
    target: {value: `${persistanceValue}`},
  })

  const submitForm = () => {
    fireEvent.click(submitButton)
  }

  return submitForm
}

describe('PasteForm', () => {
  it('Should render the form', () => {
    // given
    // when
    const {getByText, getByPlaceholderText, getByTestId} = render(<PasteForm />)
    const textAreaElement = getByPlaceholderText('Paste your text here')
    const buttonElement = getByText('Save My Paste')
    const selectPersistanceElement = getByTestId(
      'test-paste-persistance-select',
    )

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

      const {container} = render(<PasteForm postPaste={postPaste} />)

      // when
      const submitForm = fillForFields(container, {pasteText, persistanceValue})
      submitForm()

      // then

      // What I'm trying to find out here is whether a postPaste mock has been called once.
      // This is a method responsible for posting (persiste) a new paste.
      // I had problems with this assertion. This article helped me:
      // https://dev.to/charlespeters/formik-react-testing-library-and-screaming-at-a-computer-for-an-hour-5h5f
      wait(() => {
        expect(postPaste).toHaveBeenCalledTimes(1)
      })
    })

    describe('When paste creation fails on the server side', () => {
      it('Should render a toast with an error message when Error is thrown', () => {
        // given
        const pasteText = 'Hello world!'
        const persistanceValue = PASTE_PERSISTANCE_OPTIONS[0]
        const errorMessage = 'Huston we have a problem!'
        const postPaste = jest.fn(() => {
          throw new Error(errorMessage)
        })

        const {container, getByText} = render(
          <PasteForm postPaste={postPaste} />,
        )

        // when
        const submitForm = fillForFields(container, {
          pasteText,
          persistanceValue,
        })
        submitForm()

        // then
        wait(() => {
          expect(postPaste).toHaveBeenCalledTimes(1)
          expect(getByText(errorMessage)).not.toEqual(null)
        })
      })
    })
  })

  describe('When given an empty paste content', () => {
    it('Should not allow to post a paste', () => {
      // given
      const pasteText = ''
      const persistanceValue = PASTE_PERSISTANCE_OPTIONS[0]
      const postPaste = jest.fn(() => Promise.resolve())

      const {container} = render(<PasteForm postPaste={postPaste} />)

      // when
      const submitForm = fillForFields(container, {pasteText, persistanceValue})
      submitForm()

      // then
      wait(() => {
        expect(postPaste).toHaveBeenCalledTimes(0)
      })
    })

    it('Should prompt a form validation error', () => {
      // given
      const pasteText = ''
      const persistanceValue = PASTE_PERSISTANCE_OPTIONS[0]
      const postPaste = jest.fn(() => Promise.resolve())

      const {container, getByText} = render(<PasteForm postPaste={postPaste} />)

      // when
      const submitForm = fillForFields(container, {pasteText, persistanceValue})
      submitForm()

      // then
      wait(() => {
        expect(getByText('Paste cannot be empty')).not.toEqual(null)
      })
    })
  })
})
