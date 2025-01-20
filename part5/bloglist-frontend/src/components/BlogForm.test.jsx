import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, vi } from 'vitest'

describe('<BlogForm />', () => {
  let createBlog
  let user

  beforeEach(() => {
    createBlog = vi.fn()
    user = userEvent.setup()

    render(
      <BlogForm createBlog={createBlog} />
    )
  })

  test('<BlogForm /> creates new blog properly', async () => {
    const titleInput = screen.getByPlaceholderText('write title here')
    const authorInput = screen.getByPlaceholderText('write author here')
    const urlInput = screen.getByPlaceholderText('write url here')

    // User submits new entry
    const title = 'unit test new blog'
    await userEvent.type(titleInput, title)

    const author = 'unit test'
    await userEvent.type(authorInput, author)

    const url = 'url.com'
    await userEvent.type(urlInput, url)

    const createButton = screen.getByText('create')
    await userEvent.click(createButton)

    // Check createBlog mock
    expect(createBlog.mock.calls).toHaveLength(1)
    const mockCall = createBlog.mock.calls[0][0]
    expect(mockCall.title).toBe(title)
    expect(mockCall.author).toBe(author)
    expect(mockCall.url).toBe(url)
  })
})