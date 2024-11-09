import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({value}) => <div>{value}</div>

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('el valor es ahora: ', newValue)
    setValue(newValue)
  }  

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="Mil" />
      <Button handleClick={() => setToValue(0)} text="Llevar a cero" />
      <Button handleClick={() => setToValue(value + 1)} text="Incrementar" />
    </div>
  )
}

export default App