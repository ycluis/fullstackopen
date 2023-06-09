import { useMutation, useQueryClient } from 'react-query'
import { createNewAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdotesMutation = useMutation(createNewAnecdote, {
    onSuccess: (updatedAnecdote) => {
      // queryClient.invalidateQueries('anecdotes')

      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(updatedAnecdote))
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
