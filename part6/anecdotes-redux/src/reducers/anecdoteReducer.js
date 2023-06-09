import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote,
      )
    },
    createNewAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdote(_state, action) {
      return action.payload
    },
  },
})

export const { voteAnecdote, createNewAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
