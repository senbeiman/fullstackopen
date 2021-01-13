import blogService from '../services/blogs'
import { setSuccessNotification, setErrorNotification } from './notificationReducer.js'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'UPDATE_BLOG':
    return state.map((blog) =>
      blog.id === action.data.id ? action.data : blog
    )
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE_BLOG':
    return state.filter((blog) => blog.id !== action.data.blog.id)
  default:
    return state
  }
}

export const incrementLikes = blog => {
  return async (dispatch, getStore) => {
    const timeoutId = getStore().notification.timeoutId
    try {
      const incrementedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      const { user, ...blogWithoutUser } = incrementedBlog // eslint-disable-line no-unused-vars
      const data = await blogService.update(blogWithoutUser)
      dispatch({
        type: 'UPDATE_BLOG',
        data
      })
      dispatch(setSuccessNotification(timeoutId, `likes incremented for ${blog.title} by ${blog.author}`))
    } catch (exception) {
      dispatch(setErrorNotification(timeoutId, exception.message))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch, getStore) => {
    const timeoutId = getStore().notification.timeoutId
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }
    try {
      await blogService.remove(blog)
      dispatch({
        type: 'REMOVE_BLOG',
        data: { blog }
      })
      dispatch(setSuccessNotification(timeoutId, `${blog.title} by ${blog.author} removed`))
    } catch (exception) {
      dispatch(setErrorNotification(timeoutId, exception.message))
    }
  }
}
export const createBlog = blog => {
  return async (dispatch, getStore) => {
    const timeoutId = getStore().notification.timeoutId
    try {
      const data = await blogService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data
      })
      dispatch(setSuccessNotification(timeoutId, `a new blog ${blog.title} by ${blog.author} added`))
    } catch (exception) {
      dispatch(setErrorNotification(timeoutId, exception.message))
    }
  }
}

export const addComment = (blogId, comment) => {
  return async (dispatch, getStore) => {
    const timeoutId = getStore().notification.timeoutId
    try {
      const data = await blogService.postComment(blogId, comment)
      dispatch({
        type: 'UPDATE_BLOG',
        data
      })
      dispatch(setSuccessNotification(timeoutId, `comment '${comment}' added`))
    } catch (exception) {
      dispatch(setErrorNotification(timeoutId, exception.message))
    }

  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}


export default blogReducer

