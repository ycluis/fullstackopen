import { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, TextField } from '@mui/material'

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
        <TextField
          label="title"
          type="text"
          value={blogform.title}
          name="title"
          onChange={handleFormFieldChange}
          className="blog_title_input"
          margin="dense"
          size="small"
        />
      </div>
      <div>
        <TextField
          label="author"
          type="text"
          value={blogform.author}
          name="author"
          onChange={handleFormFieldChange}
          className="blog_author_input"
          margin="dense"
          size="small"
        />
      </div>
      <div>
        <TextField
          label="url"
          type="text"
          value={blogform.url}
          name="url"
          onChange={handleFormFieldChange}
          className="blog_url_input"
          margin="dense"
          size="small"
        />
      </div>
      <Button variant="outlined" size="small" type="submit" className="blog_submit_btn" style={{ marginTop: '0.5em' }}>
        create
      </Button>
    </form>
  )
}

BlogForm.propTypes = {
  submitNewBlog: PropTypes.func.isRequired,
}

export default BlogForm
