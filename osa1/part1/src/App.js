import { useState } from 'react'


//Nappikomponentti. wanha (*)
/* 
const Button = (props) => { 
  console.log(props)
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
*/

// (*)destrukturoidaan propseista vaan tarvittavat
// handleClick ja text
/* const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
) */
// jos tarvii debugata, muuta funktio pitempään 
// muotoon (yllä)ja unohda destrukturointi

/* // luodaan kaksi alkuarvon 0 saavaa tilaa
// left ja right
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  return (
    <div>
      <div>
        {left}
        <button onClick={() => setLeft(left + 1)}>
          left
        </button>
        <button onClick={() => setRight(right + 1)}>
          right
        </button>
        {right}
      </div>
    </div>
  )
} */

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        press the buttons!
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Display = props => <div>{props.value}</div>

const App = (props) => {
  const [value, setValue] = useState(10)

  // ÄLÄ MÄÄRITTELE KOMPONENTIA TÄSSÄ
  // const Display = props => <div>{props.value}</div>

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display value = {value} />
      <button onClick={() => setToValue(1000)}>
        thousand
      </button>
      <button onClick={() => setToValue(0)}>
        reset
      </button>
      <button onClick={() => setToValue(value + 1)}>
        increment
      </button>
    </div>
  )
}
export default App