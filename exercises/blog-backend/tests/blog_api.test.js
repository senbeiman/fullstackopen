const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenForTestUser = async () => {
  const response = await api
    .post('/api/login')
    .send(helper.testUser)
  return response.body.token
}

jest.setTimeout(60000)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const returnedUser = await api
    .post('/api/users')
    .send(helper.testUser)

  for (let blog of helper.initialBlogs){
    let blogObject = new Blog({ ...blog, user: returnedUser.body.id })
    await blogObject.save()
  }
})
describe('when there are some inital blogs', () => {
  test('blogs are returned as json', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog posts has id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('when adding a blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0 }
    const token = await getTokenForTestUser()
    const result = await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('Type wars')
  })
  test('adding a blog fails if a token is not provided', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0 }
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('token missing')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog missing likes property will have 0 likes', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      __v: 0 }

    const token = await getTokenForTestUser()
    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]
    expect(addedBlog.title).toBe(newBlog.title)
    expect(addedBlog.likes).toBe(0)

  })
  test('blog without title and url is not added', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      author: "Robert C. Martin",
      likes: 2,
      __v: 0 }

    const token = await getTokenForTestUser()
    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})
describe('deleting a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const token = await getTokenForTestUser()
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.titles)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blogToRequest = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    const token = await getTokenForTestUser()
    await api
      .put(`/api/blogs/${blogToRequest.id}`)
      .set('authorization', `bearer ${token}`)
      .send(blogToRequest)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const blogUpdated = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id)

    expect(blogUpdated.likes).toBe(blogToUpdate.likes + 1)
  })
})
afterAll(() => {
  mongoose.connection.close()
})
