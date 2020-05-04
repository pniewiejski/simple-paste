import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import Header from '../Header'
import Footer from '../Footer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}))

export default function Home() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Header />
      <p>Hello</p>
      <Footer />
    </div>
  )
}
