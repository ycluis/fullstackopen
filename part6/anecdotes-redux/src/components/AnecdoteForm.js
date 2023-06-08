import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (e) => {
    e.preventDefault()
    dispatch(createNewAnecdote(e.target.content.value))
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
