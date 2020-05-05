import React, {useState} from 'react'

import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

import {Form, Formik, useField} from 'formik'

import {PASTE_PERSISTANCE_OPTIONS} from '../constants'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textInput: {
    marginTop: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
}))

function PasteTextInput(props) {
  const [field] = useField(props)

  const classes = useStyles()

  return (
    <div className={classes.textInput}>
      <TextField
        defaultValue=""
        fullWidth
        helperText="Paste's content"
        id="outlined-error-helper-text"
        multiline
        placeholder="Paste your text here"
        rows={15}
        rowsMax={80}
        variant="outlined"
        color="secondary"
        {...field}
        {...props}
      />
    </div>
  )
}

function PasteSelect(props) {
  const [pastePersistance, setPastePersistance] = useState(0)
  const onChange = (event) => setPastePersistance(event.target.value)

  const classes = useStyles()

  const [field] = useField(props)

  return (
    <>
      <Select
        className={classes.formControl}
        color="secondary"
        defaultValue={PASTE_PERSISTANCE_OPTIONS[0]}
        displayEmpty
        id="paste-persistance-select"
        onChange={onChange}
        value={pastePersistance}
        {...field}
        {...props}
      >
        {PASTE_PERSISTANCE_OPTIONS.map((persistanceTime) => {
          return (
            <MenuItem key={persistanceTime} value={persistanceTime}>
              {persistanceTime}
            </MenuItem>
          )
        })}
      </Select>
      <FormHelperText>Persistance time in minutes</FormHelperText>
    </>
  )
}

export default function PasteForm(props) {
  const classes = useStyles()

  return (
    <>
      <Formik
        initialValues={{
          pasteContent: '',
          pastePersistance: '',
        }}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        <Form>
          <PasteTextInput name="pasteContent" />
          <PasteSelect name="pastePersistance" />
          <Button
            className={classes.submitButton}
            color="secondary"
            type="submit"
            variant="contained"
          >
            Save My Paste
          </Button>
        </Form>
      </Formik>
    </>
  )
}
