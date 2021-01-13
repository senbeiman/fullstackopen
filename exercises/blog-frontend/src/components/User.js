import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = () => {
  const match = useRouteMatch('/users/:id')
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === match.params.id)
  if (!user) {
    return null
  }

  return  (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        )}
      </ul>
    </div>
  )
}

export default User

