import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementLikes, removeBlog, addComment } from '../reducers/blogReducer'
import { useRouteMatch } from 'react-router-dom'
import { useField } from '../hooks'
import { TextField, Button } from '@material-ui/core'

const Blog = () => {
  const dispatch = useDispatch()
  const match = useRouteMatch('/blogs/:id')
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === match.params.id)
  const comment = useField('comment', 'text')

  const onLikeClick = () => {
    dispatch(incrementLikes(blog))
  }

  const onRemoveClick = () => {
    dispatch(removeBlog(blog))
  }

  const onCommentClick = () => {
    dispatch(addComment(blog.id, comment.attributes.value))
  }
  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <div>{blog.url}</div>
      <div>{blog.likes} likes<Button id='like-button' onClick={onLikeClick} variant="contained" color="primary">like</Button></div>
      <div>added by {blog.user.name}</div>
      <div><Button id='remove-button' onClick={onRemoveClick} variant="contained" color="secondary">remove</Button></div>
      <h2>comments</h2>
      <TextField {...comment.attributes} />
      <Button onClick={onCommentClick} variant="contained" color="primary">add comment</Button>
      <ul>
        {blog.comments.map((comment, index) =>
          <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog
