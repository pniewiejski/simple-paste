import React, {useState, useEffect} from 'react'

import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  pasteText: {
    marginTop: theme.spacing(2),
  },
}))

function PasteText(props) {
  const classes = useStyles()
  const {textValue} = props

  return (
    <div className={classes.textInput}>
      <TextField
        color="secondary"
        fullWidth
        id="outlined-error-helper-text"
        multiline
        rows={30}
        rowsMax={80}
        value={textValue}
        variant="outlined"
      />
    </div>
  )
}

export default function PastePreview(props) {
  const {getPasteById, resourceId} = props
  const [pasteData, setPasteData] = useState("")

  useEffect(() => {
    const fetchPasteData = async () => {
      const data = await getPasteById(resourceId)
      setPasteData(data.pasteContent)
    }

    fetchPasteData()
  }, [getPasteById, resourceId])

  return (
    <>
      <PasteText textValue={pasteData} />
    </>
  )
}
