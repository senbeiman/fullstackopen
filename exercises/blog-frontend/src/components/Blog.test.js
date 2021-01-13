import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('blog', () => {
  const title = 'test-title'
  const author = 'test-author'
  const url = 'http://test.com'
  const blog = {
    title,
    author,
    url,
    likes: 2,
    user: {
      name: 'test-name',
      username: 'test-username',
      id: 'test-id'
    }
  }

  test('renders blogs title and author, but not url or likes', () => {
    const component = render(
      <Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent(title)
    expect(component.container).toHaveTextContent(author)
    expect(component.container).not.toHaveTextContent(url)
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('after clicking view button, url and likes are displayed', () => {
    const component = render(
      <Blog blog={blog} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(url)
    expect(component.container).toHaveTextContent('likes')
  })

  test('clicking like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} onLikeClick={mockHandler} />
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
