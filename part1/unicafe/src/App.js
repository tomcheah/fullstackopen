import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.total > 0) {
    return (
      <div>
        <StatDisplay text="good" value={props.good} />
        <StatDisplay text="neutral" value={props.neutral} />
        <StatDisplay text="bad" value={props.bad} />
        <StatDisplay text="all" value={props.total} />
        <StatPercentage text="average" total={props.total} good={props.good} neutral={props.neutral} bad={props.bad} />
        <StatPercentage text="positive" total={props.total} good={props.good} neutral={props.neutral} bad={props.bad} />
      </div>
    )
  }
  return <div> No feedback given </div>
}

const StatDisplay = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
)

const StatPercentage = ({ text, good, neutral, bad, total}) => {
  if (text === "average") { 
    console.log(total)
    let average = (good+bad)/total
    console.log(average)
    return <div> {text} {average}</div>
  } else {
    return <div> {text} {(good)/total * 100} %</div>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = good + neutral + bad

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App