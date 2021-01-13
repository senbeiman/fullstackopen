import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import Notification from './Notification'
import { login } from '../reducers/loginReducer'
import { TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const username = useField('username', 'text')
  const password = useField('password', 'password')

  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username.attributes.value, password.attributes.value))
    username.clear()
    password.clear()
  }


  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <TextField id='username' {...username.attributes} variant="filled"/>
        </div>
        <div>
          <TextField id='password' {...password.attributes} variant="filled"/>
        </div>
        <Button id='login-button' variant="contained" color="primary" type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm
