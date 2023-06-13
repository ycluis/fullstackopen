const AnecdoteItem = ({ anecdote }) => (
  <>
    <li>
      {anecdote.content} | {anecdote.author} | {anecdote.info}
    </li>
  </>
)
export default AnecdoteItem
