import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { TextField, Button } from '@material-ui/core'

const BlogForm = ({ togglableRef }) => {
  const title = useField('title', 'text')
  const author = useField('author', 'text')
  const url = useField('url', 'text')
  const dispatch = useDispatch()
  const addBlog = (event) => {
    const newBlog = {
      title: title.attributes.value,
      author: author.attributes.value,
      url: url.attributes.value
    }
    event.preventDefault()
    togglableRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
    title.clear()
    author.clear()
    url.clear()
  }
  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField id='title' {...title.attributes} />
        </div>
        <div>
          <TextField id='author' {...author.attributes} />
        </div>
        <div>
          <TextField id='url' {...url.attributes} />
        </div>
        <Button id='create-button' variant="contained" color="primary" type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm
