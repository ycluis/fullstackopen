import './style/index.css'
import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [msg, setMsg] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
      blogService.setToken(user.token)
    }
  }, [])

  const notificationTiming = () => {
    setTimeout(() => {
      setMsg(null)
    }, 3000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setToken(user.token)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (err) {
      console.log(err)
      setMsg({ status: 'error', message: err.response.data.error })
    }

    notificationTiming()
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setToken(null)
    blogService.setToken('')
    clearUserForm()
  }

  const clearUserForm = () => {
    setUsername('')
    setPassword('')
  }

  const submitNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const res = await blogService.createNewBlog(newBlog)

      if (res.status === 201) {
        setBlogs([...blogs, res.data])
        setMsg({ status: 'success', message: `a new blog ${newBlog.title} by ${newBlog.author} added` })
      }
    } catch (err) {
      console.log(err)
      setMsg({ status: 'error', message: err.response.data.error })
    }

    notificationTiming()
  }

  const handleLikesPutReq = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    try {
      const res = await blogService.updateBlog(newBlog, blog.id)

      if (res.status === 200) {
        setBlogs(blogs.map((blog) => (blog.id === res.data.id ? res.data : blog)))
      }
    } catch (err) {
      console.log(err)
      setMsg({ status: 'error', message: err.response.data.error })
    }

    notificationTiming()
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        const res = await blogService.deleteBlog(blog)

        if (res.status === 204) {
          setBlogs(blogs.filter((updatedBlog) => updatedBlog.id !== blog.id))
        }
      } catch (err) {
        console.log(err)
        setMsg({ status: 'error', message: err.response.data.error })
      }
    }

    notificationTiming()
  }

  return (
    <div>
      {!user && (
        <>
          <h3>log in to application</h3>
          <Notification msg={msg} />
          <Toggle label="log in">
            <Login
              username={username}
              password={password}
              handleUsernameChg={({ target }) => setUsername(target.value)}
              handlePasswordChg={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
            />
          </Toggle>
        </>
      )}

      {user !== null && (
        <>
          <h2>blogs</h2>
          <Notification msg={msg} />
          <p>
            {user?.username} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Toggle label="new blog" ref={blogFormRef}>
            <BlogForm submitNewBlog={submitNewBlog} />
          </Toggle>
          <BlogList blogs={blogs} user={user} handleLikesPutReq={handleLikesPutReq} handleDelete={handleDelete} />
        </>
      )}
    </div>
  )
}

export default App
