import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (e) => {
    e.preventDefault()

    dispatch(createNew(e.target.content.value))
    dispatch(notify(`${e.target.content.value} added`, 3000))

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
