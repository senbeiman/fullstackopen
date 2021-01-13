import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import { Button, AppBar, Toolbar } from '@material-ui/core'

const Navigation = () => {
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogout = () => {
    dispatch(logout(user))
    history.push('/')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">blogs</Button>
        <Button color="inherit" component={Link} to="/users">users</Button>
        <em>{user.name} logged in</em><Button onClick={handleLogout} color="inherit">logout</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
