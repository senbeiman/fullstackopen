const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(body)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({ ...body, user: user._id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'no blog found to delete' })
  }
  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id)
    const user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.filter((blog) => blog.toString() !== request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'token invalid' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'no blog found to update' })
  }
  if (blog.user.toString() === decodedToken.id) {
    const { id, ...blogWithoutId } = request.body
    const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, blogWithoutId, { new: true, runValidators: true, context: 'query' })
    response.status(200).json(blogUpdated)
  } else {
    response.status(401).json({ error: 'token invalid' })
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'no blog found to comment' })
  }
  const newBlog = {...blog._doc, comments: [...blog._doc.comments, comment]}
  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true, context: 'query' })
  response.status(200).json(blogUpdated)
})

module.exports = blogsRouter
