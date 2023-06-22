import { createSlice } from '@reduxjs/toolkit'

export const setUsers = (data) => {
  return async (dispatch) => {
    dispatch(setUserListing(data))
  }
}

const userListingSlice = createSlice({
  name: 'userlist',
  initialState: null,
  reducers: {
    setUserListing(_state, action) {
      return action.payload
    },
  },
})

export const { setUserListing } = userListingSlice.actions
export default userListingSlice.reducer
