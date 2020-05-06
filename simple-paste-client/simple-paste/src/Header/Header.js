import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

import {withStyles} from '@material-ui/core/styles'

const styles = (theme) => ({
  headerPadding: {
    padding: '0.75em',
  },
})

function Logo() {
  return <Avatar alt="Logo" src="/simplepaste.png" variant="square" />
}

function Header(props) {
  const {classes} = props

  return (
    <AppBar className={classes.headerPadding} color="primary" position="sticky">
      <Grid container direction="row" justify="center" spacing={2}>
        <Grid item>
          <Logo />
        </Grid>
        <Grid item>
          <Typography variant="h4">SimplePaste</Typography>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default withStyles(styles)(Header)
