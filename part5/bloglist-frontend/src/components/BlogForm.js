import { useState } from 'react'

const BlogForm = ({ submitNewBlog }) => {
  const [blogform, setBlogform] = useState({ title: '', author: '', url: '' })

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    submitNewBlog(blogform)
    clearFormField()
  }

  const handleFormFieldChg = (e) => {
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
        <input type="text" value={blogform.title} name="title" onChange={handleFormFieldChg} />
      </div>
      <div>
        author
        <input type="text" value={blogform.author} name="author" onChange={handleFormFieldChg} />
      </div>
      <div>
        url
        <input type="text" value={blogform.url} name="url" onChange={handleFormFieldChg} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
