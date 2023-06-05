import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikesPutReq, handleDelete }) => {
  const blogListStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [showBlogDetail, setShowBlogDetail] = useState(false)

  const setVisibility = () => {
    setShowBlogDetail(!showBlogDetail)
  }

  return (
    <div style={blogListStyle}>
      <p>
        {blog.title} <button onClick={setVisibility}>{!showBlogDetail ? 'show' : 'hide'}</button>
      </p>
      <div style={{ display: showBlogDetail ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes} <button onClick={() => handleLikesPutReq(blog)}>likes</button>
        </p>
        <p>{blog.author}</p>
        <button style={{ display: user.id === blog.user ? '' : 'none' }} onClick={() => handleDelete(blog)}>
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikesPutReq: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
