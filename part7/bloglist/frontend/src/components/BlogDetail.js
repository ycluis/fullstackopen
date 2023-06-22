const UserDetail = ({ blog }) => {
  if (!blog) {
    return <h3>Blog not found</h3>
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <p>Added by: {blog.author}</p>
    </div>
  )
}

export default UserDetail
