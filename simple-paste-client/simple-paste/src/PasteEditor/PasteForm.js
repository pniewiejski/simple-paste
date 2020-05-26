import React, {useState} from 'react'

import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

import {Form, Formik, useField} from 'formik'
import * as Yup from 'yup'

import AlertToast from '../sharedComponents/AlertToast'

import {PASTE_PERSISTANCE_OPTIONS} from '../constants'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
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
  const classes = useStyles()

  const [field, meta] = useField(props)
  const schemaError = meta.touched && meta.error

  return (
    <div className={classes.textInput}>
      <TextField
        color="secondary"
        error={!!schemaError}
        fullWidth
        id="outlined-error-helper-text"
        multiline
        placeholder="Paste your text here"
        rows={15}
        rowsMax={80}
        variant="outlined"
        {...field}
        {...props}
      />
      <FormHelperText error={!!schemaError}>
        {schemaError || "Paste's content"}
      </FormHelperText>
    </div>
  )
}

function PasteSelect(props) {
  const [pastePersistance, setPastePersistance] = useState(0)
  const onChange = (event) => setPastePersistance(event.target.value)

  const classes = useStyles()

  const [field, meta] = useField(props)
  const schemaError = meta.touched && meta.error

  return (
    <>
      <Select
        className={classes.formControl}
        color="secondary"
        data-testid="test-paste-persistance-select"
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
      <FormHelperText error={!!schemaError}>
        {schemaError || 'Persistance time in minutes'}
      </FormHelperText>
    </>
  )
}

export default function PasteForm(props) {
  const {postPaste} = props

  const classes = useStyles()

  const handleSumbit = async (values, {setFieldError}) => {
    try {
      await postPaste(values)
    } catch (error) {
      setFieldError('general', error.message)
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          pasteContent: '',
          pastePersistance: '',
        }}
        onSubmit={handleSumbit}
        validationSchema={Yup.object({
          pasteContent: Yup.string()
            .trim()
            .min(1, 'Paste cannot be all white characters')
            .required('Paste cannot be empty'),
          pastePersistance: Yup.number()
            .required('Persistance time cannot be empty')
            .test(
              'testOfPersistance',
              'Persistance must be among the predefined values',
              (item) => PASTE_PERSISTANCE_OPTIONS.includes(item),
            ),
        })}
      >
        {(formikProps) => (
          <>
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
            <AlertToast active={!!formikProps.errors.general} severity="error">
              {formikProps.errors.general}
            </AlertToast>
          </>
        )}
      </Formik>
    </>
  )
}
