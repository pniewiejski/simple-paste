import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import themeDefinition from '../theme'

import Header from './Header'

const withThemeProvider = (WrappedComponent) => (props) => {
  const theme = createMuiTheme(themeDefinition)

  return (
    <ThemeProvider theme={theme}>
      <WrappedComponent {...props} />
    </ThemeProvider>
  )
}

describe('Header', () => {
  it('Should render the Header component', () => {
    // given
    const expectedText = 'SimplePaste'
    const expectedLogoAltText = 'Logo'

    // when
    const {getByText, getByAltText} = render(withThemeProvider(Header)({}))

    // then
    expect(getByText(expectedText)).not.toEqual(null)
    expect(getByAltText(expectedLogoAltText)).not.toEqual(null)
  })

  describe('When clicked on the logo element', () => {
    it('Should execute a onClick function passed in props', () => {
      // given
      const onClick = jest.fn() // onClick could be a function which redirects user to some location.
      const {getByAltText} = render(withThemeProvider(Header)({onClick}))

      // when
      const logo = getByAltText('Logo')
      fireEvent.click(logo)

      // then
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
