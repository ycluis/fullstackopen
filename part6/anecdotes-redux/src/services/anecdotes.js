import axios from 'axios'

const baseUrl = '/api/anecdotes'

const getAllAnecdotes = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNewAnecdote = async (newAnecdote) => {
  const res = await axios.post(baseUrl, newAnecdote)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllAnecdotes, createNewAnecdote }
