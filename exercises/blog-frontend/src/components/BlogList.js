import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@material-ui/core'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return  (
    <List className='blog-list'>
      {blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).map(blog =>
        <ListItem key={blog.id} button component={Link} to={`/blogs/${blog.id}`}>
          <ListItemText primary={blog.title}/>
        </ListItem>
      )}
    </List>
  )
}

export default BlogList
