// tehtävä 7.4 hookki
import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    propsit: {
      type, 
      value, 
      onChange},
    // 7.5 resetti
    reset
  }
}