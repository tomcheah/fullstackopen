import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, test } from 'vitest'

describe('<Blog />', () => {
  let container
  let user
  let updateBlogLikes
  let deleteBlog

  beforeEach(() => {
    const blog = {
      title: 'Unit Test Blog',
      author: 'Vitest',
      url: 'test.com',
      likes: 10
    }
    updateBlogLikes = vi.fn()
    deleteBlog = vi.fn()
    user = userEvent.setup()

    container = render(
      <Blog blog={blog} updateBlogLikes={updateBlogLikes} deleteBlog={deleteBlog}>
      </Blog>
    ).container

  })

  test('renders content', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Unit Test Blog'
    )
  })

  test('blog does not render URL or number of likes by default', () => {
    const div = container.querySelector('.blogInfoHiddenByDefault')
    expect(div).toHaveStyle('display: none')
  })

  test('blog renders URL or number of likes after clicking blogViewHideButton', async () => {
    // Info is hidden at the beginning
    const div = container.querySelector('.blogInfoHiddenByDefault')
    expect(div).toHaveStyle('display: none')

    screen.debug()

    // User clicks button
    const button = screen.getByText('view')
    await user.click(button)

    // Info is shown
    expect(div).not.toHaveStyle('display: none')
  })

  test('like button works', async () => {
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlogLikes.mock.calls).toHaveLength(2)
  })
})
