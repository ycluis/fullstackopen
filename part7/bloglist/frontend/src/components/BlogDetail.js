import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const BlogDetail = ({ blog, login }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [comment, setComment] = useState('')

  const handleFormFieldChange = (e) => {
    setComment(e.target.value)
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    await blogService.addComment(blog.id, comment)
    const blogs = await blogService.getAllBlog()
    dispatch(setBlogs(blogs.data))

    setComment('')
  }

  const handleLikesPutReq = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    try {
      const res = await blogService.updateBlog(newBlog, blog.id)

      if (res.status === 200) {
        const blogs = await blogService.getAllBlog()
        dispatch(setBlogs(blogs.data))
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
          const blogs = await blogService.getAllBlog()
          dispatch(setBlogs(blogs.data))
          navigate('/')
        }
      } catch (err) {
        console.log(err)
        dispatch(notify('error', err.response.data.error, 3000))
      }
    }
  }

  if (!blog) {
    return <h3>Blog not found</h3>
  }

  return (
    <>
      <div>
        <h3>{blog.title}</h3>
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes}
          <Button
            size="small"
            variant="contained"
            style={{ marginLeft: '0.5em' }}
            onClick={handleLikesPutReq}
            color="success"
          >
            Likes
          </Button>
        </p>
        <p>Added by: {blog.author}</p>
        <Button
          size="small"
          variant="contained"
          style={{ marginTop: '0.5em', display: login.id === blog.user ? '' : 'none' }}
          onClick={() => handleDelete(blog)}
          color="error"
        >
          remove blog
        </Button>
      </div>
      <div>
        <h4>Comments</h4>
        <form onSubmit={handleCommentSubmit}>
          <div>
            <TextField
              size="small"
              label="comment"
              margin="dense"
              type="text"
              value={comment}
              name="comment"
              onChange={handleFormFieldChange}
            />
          </div>
          <Button size="small" type="submit">
            add comment
          </Button>
        </form>
        {blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        ) : (
          <p>No comment yet!</p>
        )}
      </div>
    </>
  )
}

export default BlogDetail
