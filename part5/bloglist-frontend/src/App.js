import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (exception) {
      setError(true)
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleCreate = async (blog) => {

    blog.user = user.id

    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setError(false)
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      setError(true)
      setMessage('Error when creating the blog')
      setTimeout(() => {
        setError(false)
        setMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(blog => blog.id === id)

    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id 
    }

    const retBlog = await blogService
      .change(newBlog, blog.id)
    
    console.log(retBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : retBlog))
  }

  const userLogged = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in
      <button onClick={() => handleLogout()}>logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
      )}
      <Togglable buttonLabel="new blog  " ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      
    </div>
  )

  return (
    <div>
      <Notification message={message} error={error} />

      {user === null ?
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
      :
      <div>
        {userLogged()}
      </div>
    }
    </div>
  )
}

export default App