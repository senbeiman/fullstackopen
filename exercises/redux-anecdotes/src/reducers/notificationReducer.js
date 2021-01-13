const initialState = {
  message: '',
  visibility: false,
  timeoutId: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.data.message,
        visibility: true,
        timeoutId: action.data.timeoutId
      }
    case 'HIDE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (timeoutId, message, seconds) => {
  return dispatch => {
    clearTimeout(timeoutId)
    const newTimeoutId = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, seconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        timeoutId: newTimeoutId
      }
    })
  }
}

export default notificationReducer
