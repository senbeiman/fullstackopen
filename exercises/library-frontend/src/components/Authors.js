import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [born, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const [ changeBorn ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error)
    }
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const submit = (event) => {
    event.preventDefault()

    console.log('edit author...')
    changeBorn({ variables: { name: selectedAuthor.value, setBornTo: Number(born) } })

    setSelectedAuthor(null)
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authors.map(a => ({ value: a.name, label: a.name }))}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
