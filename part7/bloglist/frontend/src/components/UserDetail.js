const UserDetail = ({ user }) => {
  if (!user) {
    return <h3>User not found</h3>
  }

  return (
    <div>
      <h3>{user.username}</h3>
      {user.blogs.length > 0 ? (
        <>
          <p>Added blogs</p>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <h3>No blog yet..</h3>
      )}
    </div>
  )
}

export default UserDetail
