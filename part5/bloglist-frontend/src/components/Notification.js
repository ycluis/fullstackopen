import PropTypes from 'prop-types'

const Notification = ({ msg }) => {
  if (msg === null) {
    return null
  }

  return <div className={msg.status}>{msg.message}</div>
}

Notification.propTypes = {
  msg: PropTypes.object,
}

export default Notification
