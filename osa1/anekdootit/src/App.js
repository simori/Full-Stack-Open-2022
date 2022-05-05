import { useState } from 'react'

// komponentti äänestysnapille
const VoteButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      Vote
    </button>
  )
}

// komponentti seuraavan anekdootin napille
const NextButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      Next anecdote
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  // Valitaan sattumanvaraisesti jokin anekdootti
  const randomAnecdote = Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(randomAnecdote)
  // alustetaan taulukko annetuille äänille
  const [voteArray, setVoteArray] = useState(new Array(7).fill(0))

  // suurin äänimäärä mitä on annettu
  const maxVotes = Math.max(...voteArray);
 
  return (
    <div>
      <h1>Anecdote of the day!</h1>
      <p>{anecdotes[selected]}</p>
      <i>has {voteArray[selected]} votes</i>
      <br />
      
      {/* äänestysnappula*/}
      <VoteButton handleClick={() => {
        const copy = [...voteArray];
        copy[selected] += 1;
        setVoteArray(copy);
      }} />

      {/* seuraava anekdoottti */}
      <NextButton handleClick={() => {
        setSelected(Math.floor(Math.random() * anecdotes.length));
      }} />

      <h1>Anecdote with most votes:</h1>
      {anecdotes[voteArray.indexOf(maxVotes)]}<br/>
      <i>(has {maxVotes} votes)</i>

    </div>

  )
}

export default App