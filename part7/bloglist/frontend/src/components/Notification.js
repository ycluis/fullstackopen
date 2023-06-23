import PropTypes from 'prop-types'

import { Alert } from '@mui/material'

const Notification = ({ notification }) => {
  if (notification.msg === null) {
    return null
  }

  return (
    <div>
      <Alert style={{ marginBottom: '0.5em' }} severity={`${notification.status}`}>
        {notification.msg}
      </Alert>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object,
}

export default Notification
