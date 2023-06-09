import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const [msg] = useContext(NotificationContext)

  if (msg !== '') {
    return <div style={style}>{msg}</div>
  }

  return null
}

export default Notification
