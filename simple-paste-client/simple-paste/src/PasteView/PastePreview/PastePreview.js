import React, {useState, useEffect} from 'react'

import TextField from '@material-ui/core/TextField'

import AlertToast from '../../sharedComponents/AlertToast'

function PasteText(props) {
  const {textValue} = props

  return (
    <>
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
    </>
  )
}

export default function PastePreview(props) {
  const {getPasteById, resourceId} = props
  const [pasteData, setPasteData] = useState('')
  const [isError, setError] = useState(false)

  useEffect(() => {
    const fetchPasteData = async () => {
      try {
        const data = await getPasteById(resourceId)
        setPasteData(data.pasteContent)
      } catch (error) {
        setError(true)
      }
    }

    fetchPasteData()
  }, [getPasteById, resourceId])

  return (
    <>
      <PasteText textValue={pasteData} />
      {isError && (
        <AlertToast active={isError} severity="error">
          Could not find a paste: {resourceId}! Are you sure it exists? 😅
        </AlertToast>
      )}
    </>
  )
}
