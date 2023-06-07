import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ submitNewBlog }) => {
  const [blogform, setBlogform] = useState({ title: '', author: '', url: '' })

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    submitNewBlog(blogform)
    clearFormField()
  }

  const handleFormFieldChange = (e) => {
    setBlogform({
      ...blogform,
      [e.target.name]: e.target.value,
    })
  }

  const clearFormField = () => {
    setBlogform({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={handleBlogSubmit}>
      <div>
        title
        <input
          type="text"
          value={blogform.title}
          name="title"
          onChange={handleFormFieldChange}
          className="blog_title_input"
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={blogform.author}
          name="author"
          onChange={handleFormFieldChange}
          className="blog_author_input"
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={blogform.url}
          name="url"
          onChange={handleFormFieldChange}
          className="blog_url_input"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  submitNewBlog: PropTypes.func.isRequired,
}

export default BlogForm
