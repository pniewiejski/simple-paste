import React, {useState, useEffect} from 'react'

import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  alert: {
    width: '100px',
  },
  anchorOriginTopRight: {
    marginTop: theme.spacing(10),
  },
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function AlertToast(props) {
  const {children, active, severity} = props
  const [open, setOpen] = useState(active)
  const AUTO_HIDE_DURATION = 6000
  const classes = useStyles()

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') {
      setOpen(false)
    }
  }

  useEffect(() => {
    setOpen(active)
  }, [active])

  return (
    <div className={classes.alert}>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={handleClose}
        open={open}
      >
        <Alert onClose={handleClose} severity={severity}>
          {children}
        </Alert>
      </Snackbar>
    </div>
  )
}
