import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_ANECDOTE':
      return state.map((anecdote) =>
        anecdote.id === action.data.id ? action.data : anecdote
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const incrementVotes = anecdote => {
  return async dispatch => {
    const incrementedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const data = await anecdoteService.updateOne(incrementedAnecdote)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data
    })
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = {
      content,
      id: getId(),
      votes: 0
    }
    const data = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer
