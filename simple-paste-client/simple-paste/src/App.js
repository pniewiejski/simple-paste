import React from 'react'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'

import Home from './Home'
import PasteView from './PasteView'

import themeDefinition from './theme'

const theme = createMuiTheme(themeDefinition)

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <Home /> */}
        <PasteView />
      </ThemeProvider>
    </div>
  )
}

export default App
