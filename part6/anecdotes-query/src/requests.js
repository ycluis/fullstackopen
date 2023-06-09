import axios from 'axios'

const baseUrl = '/anecdotes'

export const getAnecdotes = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const createNewAnecdote = async (anecdote) => {
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

export const voteAnecdote = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return res.data
}
