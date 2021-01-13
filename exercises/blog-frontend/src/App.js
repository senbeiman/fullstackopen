import React, { useEffect, useRef } from 'react'
import Container from '@material-ui/core/Container'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { useSelector, useDispatch } from 'react-redux'
import { initializeLogin } from './reducers/loginReducer'
import { Switch, Route } from 'react-router-dom'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeLogin())
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [])

  if (user === null) {
    return <LoginForm />
  }

  return (
    <Container>
      <Navigation />
      <h2>blogs app</h2>
      <Notification  />
      <Switch>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm togglableRef={blogFormRef}/>
          </Togglable>
          <BlogList />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
