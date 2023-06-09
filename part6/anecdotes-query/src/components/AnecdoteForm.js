import { useMutation, useQueryClient } from 'react-query'
import { createNewAnecdote } from '../requests'

import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const AnecdoteForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [msg, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdotesMutation = useMutation(createNewAnecdote, {
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries('anecdotes')

      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch({ type: 'SHOW', payload: `anecdote '${newAnecdote.content}' added` })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },

    onError: (err) => {
      dispatch({ type: 'SHOW', payload: err.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()

    newAnecdotesMutation.mutate({ content: event.target.anecdote.value, votes: 0 })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
