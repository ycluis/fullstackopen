import { createSlice } from '@reduxjs/toolkit'

export const setBlogs = (data) => {
  return async (dispatch) => {
    dispatch(getAllBlogs(data))
  }
}

export const addNewBlog = (data) => {
  return async (dispatch) => {
    dispatch(setNewBlog(data))
  }
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    getAllBlogs(_state, action) {
      return action.payload
    },
    setNewBlog(state, action) {
      return [...state, action.payload]
    },
  },
})

export const { getAllBlogs, setNewBlog } = blogSlice.actions
export default blogSlice.reducer
