import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import {useParams} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'
import PastePreview from './PastePreview'

import {pasteStorage, pasteStorageMock, pasteStorageHttp} from '../pasteStorage'

const {getPasteById} = pasteStorage(pasteStorageHttp)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  pastePreviewContainer: {
    padding: theme.spacing(3, 1),
  },
}))

export default function PasteView() {
  const classes = useStyles()
  const {resourceId} = useParams()

  return (
    <div className={classes.root}>
      <Header />
      <Container className={classes.pastePreviewContainer} maxWidth="md">
        <PastePreview getPasteById={getPasteById} resourceId={resourceId} />
      </Container>
      <Footer />
    </div>
  )
}
