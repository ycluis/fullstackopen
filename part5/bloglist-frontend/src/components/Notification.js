const Notification = ({ msg }) => {
  if (msg === null) {
    return null
  }

  return <div className={msg.status}>{msg.message}</div>
}

export default Notification
