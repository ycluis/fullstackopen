import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification.msg === null) {
    return null
  }

  return <div className={notification.status}>{notification.msg}</div>
}

Notification.propTypes = {
  notification: PropTypes.object,
}

export default Notification
