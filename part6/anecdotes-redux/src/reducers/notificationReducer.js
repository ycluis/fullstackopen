import { createSlice } from '@reduxjs/toolkit'

export const notify = (msg, time) => {
  return async (dispatch) => {
    dispatch(setNotification(msg))

    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(_state, action) {
      return action.payload
    },
    clearNotification(_state, _action) {
      return ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
