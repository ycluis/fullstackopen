import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, user, handleLikesPutReq, handleDelete }) => {
  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLikesPutReq={handleLikesPutReq}
            handleDelete={handleDelete}
          />
        ))}
    </>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleLikesPutReq: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default BlogList
