import React from 'react'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import {withStyles} from '@material-ui/core/styles'

const styles = (theme) => ({
  footer: {
    padding: theme.spacing(1, 3),
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
})

function Copyright() {
  return (
    <Typography color="inherit" variant="body2">
      {'Copyright © '}
      Piotr Niewiejski {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function Footer(props) {
  const {classes} = props

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography color="inherit" variant="body1">
          Feel free to contact me.
        </Typography>
        <Copyright />
      </Container>
    </footer>
  )
}

export default withStyles(styles)(Footer)
