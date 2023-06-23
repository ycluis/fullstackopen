import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch()

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

  if (!blog) {
    return <h3>Blog not found</h3>
  }

  return (
    <>
      <div>
        <h3>{blog.title}</h3>
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes} <button onClick={handleLikesPutReq}>Likes</button>
        </p>
        <p>Added by: {blog.author}</p>
      </div>
      <div>
        <h5>comments</h5>
        <form onSubmit={handleCommentSubmit}>
          <input type="text" value={comment} name="comment" onChange={handleFormFieldChange} />
          <button type="submit">add comment</button>
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
