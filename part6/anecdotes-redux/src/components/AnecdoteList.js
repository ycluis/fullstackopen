import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted ${anecdotes.find((anecdote) => anecdote.id === id).content}`))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 2000)
  }

  const copy = [...anecdotes]

  if (filter === '') {
    return (
      <>
        {copy
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          ))}
      </>
    )
  }

  return (
    <>
      {copy
        .sort((a, b) => b.votes - a.votes)
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
