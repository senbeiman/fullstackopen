import React from 'react'

const PersonForm = ({ onSubmit, valueName, valueNumber, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={valueName} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={valueNumber} onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default PersonForm
