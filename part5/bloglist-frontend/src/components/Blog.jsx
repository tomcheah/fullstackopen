import { useState } from 'react'

const Blog = ({ blog, updateBlogLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(true)
  const [buttonName, setButtonName] = useState('view')
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const toggleButtonName = () => {
    buttonName === 'view' ? setButtonName('hide') : setButtonName('view')
  }

  const toggleVisibility = () => {
    setVisible(!visible)
    toggleButtonName()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLikes = async (event) => {
    event.preventDefault()
    const updatedBlogObject = { ...blog, likes: blog.likes + 1 }
    await updateBlogLikes(updatedBlogObject)
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    await deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonName}</button>
      </div>
      <div style={hideWhenVisible}>
        {blog.url}
        <br />
        likes: {blog.likes}
        <button onClick={updateLikes}>like</button>
        <br />
        {blog.user ? blog.user.name : 'No user'}
        <br />
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog