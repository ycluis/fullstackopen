import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, score}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{score}</td>
    </tr>
  )
}

const Statistics = ({score}) => {
  const {good, neutral, bad, total} = score
  const average = ((good - bad) / total)
  const positive = ((good / total) * 100)

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" score={good} />
            <StatisticLine text="neutral" score={neutral} />
            <StatisticLine text="bad" score={bad} />
            <StatisticLine text="total" score={total} />
            <StatisticLine text="average" score={!average ? 0 : average} />
            <StatisticLine text="positive" score={`${!positive ? 0 : positive}%`} />
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const setScore = (category) => {
    switch(category) {
      case 'good':
        setGood(good + 1)
        break;
      case 'neutral':
        setNeutral(neutral + 1)
        break;
      case 'bad':
        setBad(bad + 1)
        break;
      default:
        break;
    }
    setTotal(total + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button text='good' handleClick={() => setScore('good')} />
      <Button text='neutral' handleClick={() => setScore('neutral')} />
      <Button text='bad' handleClick={() => setScore('bad')} />
      <Statistics score={{good, neutral, bad, total}} />
    </div>
  )
}

export default App