import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({value, text}) => {
  if (text == "Positive: "){
    return (
      <tr key={value}>
        <td>{text}:</td><td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr key={value}>
      <td>{text}:</td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, allClick, promClick}) => {
  if (allClick == 0) {
    return (
      <div>
        <span>No se ha dado ningún comentario</span>
      </div>
    )
  }
  
  return (
    <table>
      <tbody>
        <StatisticLine text="Good: " value={good} />
        <StatisticLine text="Neutral: " value={neutral} />
        <StatisticLine text="Bad: " value={bad} />
        <StatisticLine text="All: " value={allClick} />
        <StatisticLine text="Average: " value={promClick/allClick} />
        <StatisticLine text="Positive: " value={good/allClick*100} />
      </tbody>
    </table>
  )
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClick, setAll] = useState(0)
  const [promClick, setProm] = useState(0)
  const [positiveClick, setPostive] = useState(0)
  

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClick + 1)
    setProm(promClick + 1)
    setPostive(positiveClick + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClick + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClick + 1)
    setProm(promClick - 1)
  }

  return (
    <div>
      <h2>Dame un comentario:</h2>
      <Button handleClick={() => handleGoodClick(good + 1)} text="Bueno"/>
      <Button handleClick={() => handleNeutralClick(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => handleBadClick(bad + 1)} text="Malo"/>
      
      <div>
        <h3>Estadísticas:</h3>
        <Statistics good={good} neutral={neutral} bad={bad} allClick={allClick} promClick={promClick}/>
      </div>
    </div>
  )
}

export default App