import { createSlice } from '@reduxjs/toolkit'

export const setLogin = (data) => {
  return async (dispatch) => {
    dispatch(setLoginState(data))
  }
}

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLoginState(_state, action) {
      return action.payload
    },
  },
})

export const { setLoginState } = loginSlice.actions
export default loginSlice.reducer
