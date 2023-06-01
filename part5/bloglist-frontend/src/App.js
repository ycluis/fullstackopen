import './style/index.css'
import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlogForm from './components/createBlogForm'
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
  const [blogform, setBlogform] = useState({ title: '', author: '', url: '' })

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

    clearFormField()
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await blogService.createNewBlog(blogform)

      if (res.status === 201) {
        setBlogs([...blogs, res.data])
        setMsg({ status: 'success', message: `a new blog ${blogform.title} by ${blogform.author} added` })
      }
    } catch (err) {
      console.log(err)
      setMsg({ status: 'error', message: err.response.data.error })
    }

    clearFormField()
    notificationTiming()
  }

  const handleFormFieldChg = (e) => {
    setBlogform({
      ...blogform,
      [e.target.name]: e.target.value,
    })
  }

  const clearFormField = () => {
    setBlogform({ title: '', author: '', url: '' })
  }

  return (
    <div>
      {!user && (
        <>
          <h3>log in to application</h3>
          <Notification msg={msg} />
          <Login
            username={username}
            password={password}
            handleUsernameChg={({ target }) => setUsername(target.value)}
            handlePasswordChg={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </>
      )}

      {user !== null && (
        <>
          <h2>blogs</h2>
          <Notification msg={msg} />
          <p>
            {user?.username} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <CreateBlogForm
            handleBlogSubmit={handleBlogSubmit}
            blogform={blogform}
            handleFormFieldChg={handleFormFieldChg}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
