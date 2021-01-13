import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show, token }) => {
  const [ fetchBooks, booksResult ] = useLazyQuery(ALL_BOOKS)
  const [ fetchMe, meResult ] = useLazyQuery(ME)
  useEffect(() => {
    fetchMe()
  }, [token])
  useEffect(() => {
    meResult.data && meResult.data.me && fetchBooks({ variables: { genre: meResult.data.me.favoriteGenre } })
  }, [meResult.data])
  if (!show) {
    return null
  }
  if (!booksResult.data || !meResult.data || meResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }
  const books = booksResult.data.allBooks
  const genre = meResult.data.me.favoriteGenre

  return (
    <div>
      <h2>books</h2>
      {<p>books in your favorite genre <strong>{genre}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
