import React from 'react'
import {render} from '@testing-library/react'

import Footer from './Footer'

describe('SickyFooter', () => {
  it('Should render the Footer component', () => {
    // given
    const expectedText = 'Feel free to contact me.'

    // when
    const {getByText} = render(<Footer />)

    // then
    expect(getByText(expectedText)).not.toEqual(null)
  })

  it('Should render the current year in the Copyright info', () => {
    // given
    const expectedYear = new Date().getFullYear()

    // when
    const {getByText} = render(<Footer />)

    // then
    expect(getByText(/\d{4}/)).toHaveTextContent(expectedYear)
  })
})
