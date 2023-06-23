import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

const Blog = ({ blog }) => {
  const blogListStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogListStyle} className="blog-wrapper">
      <Button color="inherit" component={Link} to={`/blogs/${blog.id}`}>
        {blog.title}
      </Button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
