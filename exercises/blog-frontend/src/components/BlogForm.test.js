import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  const title = 'test-title'
  const author = 'test-author'
  const url = 'http://test.com'
  fireEvent.change(titleInput, {
    target: { value: title }
  })
  fireEvent.change(authorInput, {
    target: { value: author }
  })
  fireEvent.change(urlInput, {
    target: { value: url }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(title)
  expect(createBlog.mock.calls[0][0].author).toBe(author)
  expect(createBlog.mock.calls[0][0].url).toBe(url)
})
