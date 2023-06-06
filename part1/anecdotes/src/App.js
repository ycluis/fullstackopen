import { useState } from 'react'
import anecdotes from './anecdotes'

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const voteSelected = () => {
    const copy = { ...votes }
    copy[selected] = copy[selected] ? (copy[selected] += 1) : 1
    setVotes(copy)
  }

  const getRandomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random === selected ? Math.floor(Math.random() * anecdotes.length) : random)
  }

  const getMostVoted = () => {
    const voteCount = Object.values(votes)
    const mostVoted = Math.max(...voteCount)

    return Object.keys(votes).find((key) => votes[key] === mostVoted)
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      {anecdotes[selected]}
      <p>has {votes[selected] ? votes[selected] : 0} votes</p>
      <div>
        <Button text="vote" handleClick={voteSelected} />
        <Button text="next anecdote" handleClick={getRandomAnecdote} />
      </div>
      <div>
        <h3>Anecdote with most votes</h3>
        {Object.keys(votes).length > 0 && (
          <>
            {anecdotes[getMostVoted()]}
            <p>has {votes[getMostVoted()]} votes</p>
          </>
        )}
      </div>
    </div>
  )
}

export default App
