import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

const initBlog = {
  title: 'Ah, Wilderness!',
  author: 'Eugene Neill',
  likes: 12,
  url: 'https://en.wikipedia.org/wiki/Ah,_Wilderness!',
}

const initUser = {
  username: 'john.doe',
  name: 'John Doe',
  id: '62aeef7f39985818a437b4d1',
}

test('shows title by default', () => {
  const { container } = render(<Blog blog={initBlog} user={initUser} />)
  const title = container.querySelector('.blog_title')
  const details = container.querySelector('.blog_details')

  expect(title).toBeInTheDocument()
  expect(details).toHaveStyle('display: none')
})

test('show blog details', async () => {
  const { container } = render(<Blog blog={initBlog} user={initUser} />)

  const user = userEvent.setup()
  const btn = screen.getByText('show')
  await user.click(btn)

  const details = container.querySelector('.blog_details')
  expect(details).not.toHaveStyle('display: none')
})

test('event handler test', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={initBlog} user={initUser} handleLikesPutReq={mockHandler} />)

  const user = userEvent.setup()
  const btn = screen.getByText('likes')
  await user.click(btn)
  await user.click(btn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('blog form test', async () => {
  const submitNewBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm submitNewBlog={submitNewBlog} />)

  const titleInput = container.querySelector('.blog_title_input')
  const authorInput = container.querySelector('.blog_author_input')
  const urlInput = container.querySelector('.blog_url_input')
  const submitButton = screen.getByText('create')

  await user.type(titleInput, 'After Many a Summer Dies the Swan')
  await user.type(authorInput, 'Aldous Huxley')
  await user.type(urlInput, 'https://en.wikipedia.org/wiki/After_Many_a_Summer')
  await user.click(submitButton)

  expect(submitNewBlog.mock.calls).toHaveLength(1)
  expect(submitNewBlog.mock.calls[0][0].title).toBe('After Many a Summer Dies the Swan')
  expect(submitNewBlog.mock.calls[0][0].author).toBe('Aldous Huxley')
  expect(submitNewBlog.mock.calls[0][0].url).toBe('https://en.wikipedia.org/wiki/After_Many_a_Summer')
})
