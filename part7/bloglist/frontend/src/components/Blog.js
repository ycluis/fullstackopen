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
    <div style={blogListStyle} className="blog-wrapper">
      <p className="blog_title">
        {blog.title}{' '}
        <button onClick={setVisibility} className="blog_visibility_btn">
          {!showBlogDetail ? 'show' : 'hide'}
        </button>
      </p>
      <div style={{ display: showBlogDetail ? '' : 'none' }} className="blog_details">
        <p>{blog.url}</p>
        <p className="blog_likes_count">
          Likes: {blog.likes}{' '}
          <button onClick={() => handleLikesPutReq(blog)} className="blog_likes_btn">
            likes
          </button>
        </p>
        <p>{blog.author}</p>
        <button
          className="blog_remove_btn"
          style={{ display: user.id === blog.user ? '' : 'none' }}
          onClick={() => handleDelete(blog)}
        >
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
