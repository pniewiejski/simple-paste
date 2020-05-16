import React from 'react'
import {useHistory} from 'react-router-dom'

import Header from './Header'

const withGoHomeOnClick = (WrappedComponent) => (props) => {
  const history = useHistory()
  const goHome = () => history.push('/')

  return <WrappedComponent onClick={goHome} {...props} />
}

export default withGoHomeOnClick(Header)
