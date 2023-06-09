import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdotesMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdotesMutation.mutate(newAnecdote)
  }

  const res = useQuery('anecdotes', getAnecdotes, { retry: 3 })

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
