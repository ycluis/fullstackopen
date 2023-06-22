import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { setBlogs, addNewBlog } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'

import Notification from './Notification'
import Toggle from './Toggle'
import Login from './Login'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

import blogService from '../services/blogs'
import loginService from '../services/login'

const BlogContainer = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [login, setLogin] = useState({ username: '', password: '' })
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogs = await blogService.getAllBlog()
      dispatch(setBlogs(blogs.data))
    }
    fetchAllBlogs()
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      setToken(user.token)
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const clearUserForm = () => {
    setLogin({ username: '', password: '' })
  }

  const handleLoginFieldChange = (e) => {
    const copy = { ...login }
    setLogin({
      ...copy,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      if (!login.username || !login.password) {
        window.alert('Please fill in all the fields')
      } else {
        const user = await loginService.login(login)
        dispatch(setUser(user))
        setToken(user.token)
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
      }
    } catch (err) {
      console.log(err)
      clearUserForm()
      dispatch(notify('error', err.response.data.error, 3000))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
    setToken(null)
    blogService.setToken('')
    clearUserForm()
  }

  const submitNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const res = await blogService.createNewBlog(newBlog)

      if (res.status === 201) {
        dispatch(addNewBlog(res.data))
        dispatch(notify('success', `a new blog ${newBlog.title} by ${newBlog.author} added`, 3000))
      }
    } catch (err) {
      console.log(err)
      dispatch(notify('error', err.response.data.error, 3000))
    }
  }

  const handleLikesPutReq = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    try {
      const res = await blogService.updateBlog(newBlog, blog.id)

      if (res.status === 200) {
        dispatch(setBlogs(blogs.map((blog) => (blog.id === res.data.id ? res.data : blog))))
      }
    } catch (err) {
      console.log(err)
      dispatch(notify('error', err.response.data.error, 3000))
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        const res = await blogService.deleteBlog(blog)

        if (res.status === 204) {
          dispatch(setBlogs(blogs.filter((updatedBlog) => updatedBlog.id !== blog.id)))
        }
      } catch (err) {
        console.log(err)
        dispatch(notify('error', err.response.data.error, 3000))
      }
    }
  }

  const copy = [...blogs]
  return (
    <div>
      {!user && (
        <>
          <h3>Log in to application</h3>
          <Notification notification={notification} />
          <Toggle label="login">
            <Login login={login} handleLoginFieldChange={handleLoginFieldChange} handleLogin={handleLogin} />
          </Toggle>
        </>
      )}

      {user !== null && (
        <>
          <h2>Blogs</h2>
          <Notification notification={notification} />
          <p>
            {user?.username} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Toggle label="New blog" ref={blogFormRef}>
            <BlogForm submitNewBlog={submitNewBlog} />
          </Toggle>
          <BlogList blogs={copy} user={user} handleLikesPutReq={handleLikesPutReq} handleDelete={handleDelete} />
        </>
      )}
    </div>
  )
}

export default BlogContainer
