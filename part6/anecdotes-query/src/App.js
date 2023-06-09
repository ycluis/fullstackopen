import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useContext } from 'react'
import NotificationContext from './context/NotificationContext'

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [msg, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const updateAnecdotesMutation = useMutation(voteAnecdote, {
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({ type: 'SHOW', payload: `anecdote '${updatedAnecdote.content}' voted` })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },
  })

  const handleVote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdotesMutation.mutate(newAnecdote)
  }

  const res = useQuery('anecdotes', getAnecdotes, { retry: 3, refetchOnWindowFocus: false })

  if (res.isLoading) {
    return <div>Loading data...</div>
  }

  if (res.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = res.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
