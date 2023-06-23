import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { setBlogs, addNewBlog } from '../reducers/blogReducer'
import { setLogin } from '../reducers/loginReducer'

import Notification from './Notification'
import Toggle from './Toggle'
import Login from './Login'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

import blogService from '../services/blogs'
import loginService from '../services/login'

import Typography from '@mui/material/Typography'

const BlogContainer = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const login = useSelector((state) => state.login)

  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
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
      dispatch(setLogin(user))
      setToken(user.token)
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const clearUserForm = () => {
    setLoginForm({ username: '', password: '' })
  }

  const handleLoginFieldChange = (e) => {
    const copy = { ...loginForm }
    setLoginForm({
      ...copy,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      if (!loginForm.username || !loginForm.password) {
        window.alert('Please fill in all the fields')
      } else {
        const user = await loginService.login(loginForm)
        dispatch(setLogin(user))
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
      {!login && (
        <>
          <Typography variant="h5" style={{ margin: '0.5em' }}>
            Log in to application
          </Typography>
          <Notification notification={notification} />
          <Toggle label="login">
            <Login login={loginForm} handleLoginFieldChange={handleLoginFieldChange} handleLogin={handleLogin} />
          </Toggle>
        </>
      )}

      {login !== null && (
        <>
          <Typography variant="h5" style={{ margin: '0.5em' }}>
            Blogs
          </Typography>
          <Notification notification={notification} />
          <Toggle label="New blog" ref={blogFormRef}>
            <BlogForm submitNewBlog={submitNewBlog} />
          </Toggle>
          <BlogList blogs={copy} user={login} handleLikesPutReq={handleLikesPutReq} handleDelete={handleDelete} />
        </>
      )}
    </div>
  )
}

export default BlogContainer
