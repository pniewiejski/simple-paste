import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import ButtonBase from '@material-ui/core/ButtonBase'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import {withStyles} from '@material-ui/core/styles'

const styles = (theme) => ({
  headerPadding: {
    padding: '0.75em',
  },
})

function Logo() {
  const LOGO_IMAGE_PATH = '/simplepaste.png'

  return <Avatar alt="Logo" src={LOGO_IMAGE_PATH} variant="square" />
}

function Header(props) {
  const {classes, onClick} = props

  return (
    <AppBar className={classes.headerPadding} color="primary" position="sticky">
      <Grid container direction="row" justify="center" spacing={2}>
        <Grid item>
          <ButtonBase disableRipple onClick={onClick}>
            <Logo />
          </ButtonBase>
        </Grid>
        <Grid item>
          <Typography variant="h4">SimplePaste</Typography>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default withStyles(styles)(Header)
