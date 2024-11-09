import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const HasVote = ({votes}) => {
  return (
    <span><br />has {votes} votes</span>
  )
}

const DisplayAnecdoteMoreVoted = ({points, anecdotes}) => {
  const copyPoints = [...points]
  const maxVoted = Math.max(...copyPoints)
  const maxVotedIndex = copyPoints.findIndex((i) => i === maxVoted)

  return (
    <div>
      <h2>Anecdotes with most Votes</h2>
      <span>{anecdotes[maxVotedIndex]}</span><br />
      <span>has {points[maxVotedIndex]} votes</span>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const max = anecdotes.length
  const initialArray = new Array(max).fill(0)
  const [points, setPoints] = useState(initialArray)
  const [votes, setVotes] = useState(0)


  const nextAnecdote = () => {
    const aleatorio = Math.floor(Math.random() * max)
    setVotes(points[aleatorio])
    setSelected(aleatorio)
  }

  const anecdoteVoted = (selected) => {
    // Copia del arreglo y buscar por el que votaron
    console.log('Selected vale ahora: ', selected)
    const nextPoints = points.map((v, i) => {
      if (i === selected) {
        // Sumar uno al que le dieron click
        setVotes(points[i] + 1)
        return v + 1;
      } else {
        // El resto no ha cambiado
        return v;
      }
    });
    setPoints(points => nextPoints)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <HasVote votes={votes} />
      <br />
      <Button handleClick={() => anecdoteVoted(selected)} text="Vote" />
      <Button handleClick={() => nextAnecdote()} text="Next Anecdote" />
      <DisplayAnecdoteMoreVoted points={points} anecdotes={anecdotes}/>
    </div>
  )

  /* Para mostrar cómo va el puntaje

  <p>Arreglo de votos:</p>
  <span>0|1|2|3|4|5|6|7</span><br />
  <span>{points.join('|')}</span><br /><br />

  */
}

export default App