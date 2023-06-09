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

const voteAnecdote = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllAnecdotes, createNewAnecdote, voteAnecdote }
