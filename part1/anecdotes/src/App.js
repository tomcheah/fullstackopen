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

const Anecdote = ({headerText, displayedAnecdote, numVotes}) => (
  <div>
    <Header text={headerText}/>
    <div>
      {displayedAnecdote}
    </div>
    <div>
      has {numVotes} votes
    </div>
  </div>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  'The master has failed more times than the beginner has even tried.',
  'First, solve the problem. Then, write the code.'
]

const App = () => {
  const [selected, setSelected] = useState(0)
  const [scores, setScore] = useState(Array(anecdotes.length).fill(0))
  let mostVotes = Math.max(...scores)
  let mostVotesIndex = scores.indexOf(mostVotes)

  return (
    <div>
      <Anecdote headerText="Anecdote of the day" displayedAnecdote={anecdotes[selected]} numVotes={scores[selected]}/>
      <Button handleClick={() => setScore(updateScore(scores, selected))} text="vote"/>
      <Button handleClick={() => setSelected(genRandomNumber(anecdotes.length))} text="next anecdote"/>
      <Anecdote headerText="Anecdote with most votes" displayedAnecdote={anecdotes[mostVotesIndex]} numVotes={mostVotes}/>
    </div>
  )
}

export default App
