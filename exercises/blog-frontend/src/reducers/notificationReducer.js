const initialState = {
  message: '',
  isError: false,
  timeoutId: null
}

const notificationDurationSeconds = 5

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return { ...action.data }
  case 'HIDE_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

const setNotification = (timeoutId, message, isError) => {
  return dispatch => {
    clearTimeout(timeoutId)
    const newTimeoutId = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, notificationDurationSeconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        isError,
        timeoutId: newTimeoutId
      }
    })
  }
}

export const setErrorNotification = (timeoutId, message) => {
  return dispatch => {
    dispatch(setNotification(timeoutId, message, true))
  }
}

export const setSuccessNotification = (timeoutId, message) => {
  return dispatch => {
    dispatch(setNotification(timeoutId, message, false))
  }
}

export default notificationReducer
