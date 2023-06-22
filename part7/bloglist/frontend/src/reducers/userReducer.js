import { createSlice } from '@reduxjs/toolkit'

export const setUsers = (data) => {
  return async (dispatch) => {
    dispatch(setUserState(data))
  }
}

const usersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUserState(_state, action) {
      return action.payload
    },
  },
})

export const { setUserState } = usersSlice.actions
export default usersSlice.reducer
