import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'

const Toggle = forwardRef((props, refs) => {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setLoginVisible(!loginVisible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button variant="outlined" onClick={toggleVisibility} size="small" style={{ marginBottom: '0.5em' }}>
          {props.label}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} size="small" style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
          cancel
        </Button>
      </div>
    </>
  )
})

Toggle.propTypes = {
  props: PropTypes.object,
}

export default Toggle
