import { useState } from 'react'

const genRandomNumber = (ceiling) => Math.floor(Math.random() * ceiling)

const updateScore = (scores, index) => {
  const copy = [...scores]
  copy[index] += 1
  return copy
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({text}) => <h1> {text} </h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]


  const [selected, setSelected] = useState(0)
  const [scores, setScore] = useState(Array(anecdotes.length).fill(0))
  let mostVotes = Math.max(...scores)
  let mostVotesIndex = scores.indexOf(mostVotes)

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {scores[selected]} votes
      </div>
      <Button handleClick={() => setScore(updateScore(scores, selected))} text="vote"/>
      <Button handleClick={() => setSelected(genRandomNumber(anecdotes.length))} text="next anecdote"/>
      <Header text="Anecdote with most votes"/>
      <div>
        {anecdotes[mostVotesIndex]}
      </div>
      <div>
        has {scores[mostVotesIndex]} votes
      </div>
    </div>
  )
}

export default App
