import { createSlice } from '@reduxjs/toolkit'

export const setUser = (data) => {
  return async (dispatch) => {
    dispatch(setUserState(data))
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUserState(_state, action) {
      return action.payload
    },
  },
})

export const { setUserState } = userSlice.actions
export default userSlice.reducer
