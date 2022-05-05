import { useState } from 'react'

// tehtävä 1.8 Statistics-komponentti
const Statistics = (props) => {
  if (props.total === 0) { // tehtävä 1.9
    return (
      <div>
        No feedback given yet!
      </div>
    )
  }
  return ( //tehtävä 1.11*
    <table>
      <tbody>
        <tr>
          <td><StatisticsLine text='good' /></td>
          <td><StatisticsLine value={props.good} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text='neutral' /></td>
          <td><StatisticsLine value={props.neutral} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text='bad' /></td>
          <td><StatisticsLine value={props.bad} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text='total' /></td>
          <td><StatisticsLine value={props.total} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text='average' /></td>
          <td><StatisticsLine value={props.average} /></td>
        </tr>
        <tr>
          <td><StatisticsLine text='positive' /></td>
          <td><StatisticsLine value={props.positive} /></td>
        </tr>
      </tbody>
    </table>

  )
}

// tehtävä 1.10
const StatisticsLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

// tehtävä 1.10
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  // pyöristän keskiarvon ja positiivisten osuuden kahteen desimaaliin
  const average = ((good - bad) / total).toFixed(2)
  const positive = ((good / total) * 100).toFixed(2)

  //Math.round((positive + Number.EPSILON) * 100) / 100

  return (
    <div>
      <h1>Unicafe Feedback Application</h1>
      <p>Use these buttons to give feedback to Unicafe.</p>
      <Button handleClick={() => setGood(good + 1)} text='Good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='Bad' />

      <h1>Statistics</h1>

      <Statistics
        good={good} neutral={neutral} bad={bad}
        total={total} average={average} positive={positive + '%'}
      />
    </div>
  )
}

export default App