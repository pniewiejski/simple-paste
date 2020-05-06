import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import themeDefinition from './theme'

import Home from './Home'
import PasteView from './PasteView'


const theme = createMuiTheme(themeDefinition)

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/paste/:resourceId">
            <PasteView />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App
