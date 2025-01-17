import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

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

  const updateMessage = ( {message, messageType} ) => {
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
      updateMessage({message: 'Welcome to BlogApp!', messageType: 'success'} )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      updateMessage({message: 'Incorrect username or password', messageType: 'error'})
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    updateMessage({message: 'Have a nice day! :D', messageType: 'success'} )
    window.localStorage.clear()
    setUser(null)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    const blogObject = {
      author: author, 
      title: title,
      url: url,
    }

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      updateMessage({message: `New blog ${newBlog.title} by ${newBlog.author} has been created`, messageType: 'success'})
    } catch (exception) {
      updateMessage({message: 'Blog failed to post', messageType: 'error'})
    }

    setAuthor('')
    setTitle('')
    setUrl('')
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
        <BlogForm handleBlogCreation={handleBlogCreation} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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