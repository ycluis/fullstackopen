import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (e) => {
    e.preventDefault()
    const newAnecdote = await anecdotesService.createNewAnecdote({ content: e.target.content.value, votes: 0 })
    dispatch(createNewAnecdote(newAnecdote))
    dispatch(setNotification(`${e.target.content.value} added`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 2000)

    e.target.content.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
