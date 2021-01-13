import { useState } from 'react'

export const useField = (label, type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }
  return {
    attributes: {
      label,
      type,
      name: label,
      value,
      onChange
    },
    clear
  }
}
