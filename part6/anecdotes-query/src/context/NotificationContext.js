import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [msg, msgDispatch] = useReducer(notificationReducer, '')

  return <NotificationContext.Provider value={[msg, msgDispatch]}>{props.children}</NotificationContext.Provider>
}

export default NotificationContext
