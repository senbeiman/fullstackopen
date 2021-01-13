import loginService from '../services/login'
import blogService from '../services/blogs'
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer'

const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return { ...action.data }
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = (username, password) => {
  return async (dispatch, getStore) => {
    const timeoutId = getStore().notification.timeoutId
    try {
      const loginUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loginUser)
      )
      blogService.setToken(loginUser.token)
      dispatch({
        type: 'LOGIN',
        data: loginUser
      })
      dispatch(setSuccessNotification(timeoutId, `${loginUser.name} logged in`))
    } catch (exception){
      dispatch(setErrorNotification(timeoutId, 'wrong username or password'))
      console.log(exception)
    }
  }
}

export const initializeLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'LOGIN',
        data: loggedUser
      })
    }
  }
}

export const logout = (user) => {
  return async (dispatch, getStore) => {
    const timeoutId = getStore().notification.timeoutId
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({ type: 'LOGOUT' })
    dispatch(setSuccessNotification(timeoutId, `${user.name} logged out`))
  }
}

export default loginReducer
