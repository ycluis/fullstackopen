const UserDetail = ({ user }) => {
  if (!user) {
    return <h3>User not found</h3>
  }

  return (
    <div>
      <h3>{user.username}</h3>
      <p>added blogs</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail
