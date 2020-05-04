import React from 'react'
import {render} from '@testing-library/react'

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import themeDefinition from '../theme'

import Header from './Header'

const theme = createMuiTheme(themeDefinition)

describe('Header', () => {
  it('Should render the Header component', () => {
    // given
    const expectedText = 'SimplePaste'
    
    // when
    const {getByText} = render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>,
    )
    
    // then
    expect(getByText(expectedText)).not.toEqual(null)
  })
})
