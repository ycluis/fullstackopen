const createBlogForm = ({ handleBlogSubmit, blogform, handleFormFieldChg }) => {
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

export default createBlogForm
