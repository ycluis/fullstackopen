import { createSlice } from '@reduxjs/toolkit'

export const notify = (status, msg, time) => {
  return async (dispatch) => {
    dispatch(setNotification({ status, msg }))

    setTimeout(() => {
      dispatch(setNotification({ status: null, msg: null }))
    }, time)
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { status: null, msg: null },
  reducers: {
    setNotification(_state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
