import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from "./components/BlogForm"
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClass, setNotificationClass] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const Notification = ({ message, className }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={className}>
        {message}
      </div>
    )
  }

  const setNotification = (message, className) => {
    setNotificationMessage(message)
    setNotificationClass(className)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationClass('')
    }, 4000)       
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      let response = await blogService.create({title, author, url})
      console.log(response.author)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setNotification(`a new blog "${title}" by ${author} added`, "success")
    } catch (exception) {
      setNotification(`exception ocurred while adding new blog: ${exception}`)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotification(`wrong username or password`, "error")
    }
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleNewBlog={handleNewBlog}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
      />
    </Togglable>
  )

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} className={notificationClass}/>
      <div>{user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ? loginForm() : blogsList()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App
