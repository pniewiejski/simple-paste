import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import {withStyles} from '@material-ui/core/styles'

import PasteForm from './PasteForm'
import {pasteStorage, pasteStorageLocal} from './pasteStorage'

const {postPaste} = pasteStorage(pasteStorageLocal)

const styles = (theme) => ({
  pasteEditor: {
    padding: theme.spacing(3, 1),
  },
})

function PasteEditor(props) {
  const {classes} = props

  return (
    <Container className={classes.pasteEditor} maxWidth="md">
      <Typography variant="h4">How to save a Pase?</Typography>
      <Typography variant="body1">
        It is all quite easy! Simply paste whatever you want to save in the text
        area bellow. Select how long should it persist. And then click{' '}
        <code>Save My Paste</code>. That&apos;s it!
      </Typography>
      <PasteForm postPaste={postPaste} />
    </Container>
  )
}

export default withStyles(styles)(PasteEditor)
