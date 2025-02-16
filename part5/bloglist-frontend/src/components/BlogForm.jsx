import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      author: author,
      title: title,
      url: url,
    }
    await createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2> Create new </h2>
      <form onSubmit={addBlog}>
        <div>
                title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='write title here'
          />
        </div>
        <div>
                author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={( { target }) => setAuthor(target.value)}
            placeholder='write author here'
          />
        </div>
        <div>
                url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={( { target }) => setUrl(target.value)}
            placeholder='write url here'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm