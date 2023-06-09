import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAllAnecdotes()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createNew = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNewAnecdote({ content: anecdote, votes: 0 })
    dispatch(createNewAnecdote(newAnecdote))
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.voteAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map((anecdote) => (anecdote.id === action.payload.id ? action.payload : anecdote))
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
