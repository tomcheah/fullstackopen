import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateMessage = ( { message, messageType } ) => {
    setMessageType(messageType)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setMessageType('')
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      updateMessage({ message: 'Welcome to BlogApp!', messageType: 'success' } )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      updateMessage({ message: 'Incorrect username or password', messageType: 'error' })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    updateMessage({ message: 'Have a nice day! :D', messageType: 'success' } )
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      updateMessage({ message: `New blog ${newBlog.title} by ${newBlog.author} has been created`, messageType: 'success' })
    } catch (exception) {
      console.log(exception)
      updateMessage({ message: 'Blog failed to post', messageType: 'error' })
    }
  }

  const updateBlogLikes = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      setBlogs(
        blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      )
    } catch (exception) {
      console.log(exception)
      updateMessage({ message: 'Failed to update likes', messageType: 'error' })
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      if (window.confirm(`Delete blog ${blogObject.title} by ${blogObject.author}?`)) {
        await blogService.deleteBlog(blogObject.id)
        setBlogs(
          blogs.filter(blog => blog.id !== blogObject.id)
        )
      }
    } catch (exception) {
      console.log(exception)
      updateMessage({ message: 'Failed to delete blog', messageType: 'error' })
    }
  }

  const compareLikes = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) {
      return 1
    } else if (blog2.likes < blog1.likes) {
      return -1
    }

    return 0
  }

  const forms = () => {
    if (user === null) {
      return (
        <LoginForm  handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      )
    }

    return (
      <div>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}> logout </button>
        </p>
        <Togglable buttonLabel='create' ref={blogFormRef}>
          <BlogForm createBlog={createBlog}/>
        </Togglable>

        {blogs.sort(compareLikes).map(blog =>
          <Blog key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes} deleteBlog={deleteBlog} />
        )
        }

      </div>
    )
  }


  return (
    <div>
      <Notification message={message} messageType={messageType}/>
      {forms()}
    </div>
  )
}

export default App