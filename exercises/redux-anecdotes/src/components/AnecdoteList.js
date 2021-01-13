import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes
    .filter(anecdote => anecdote.content.includes(state.filter))
  )
  const timeoutId = useSelector(state => state.notification.timeoutId)
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(incrementVotes(anecdote))
    dispatch(setNotification(timeoutId, `you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
