import Blog from './Blog'

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

export default BlogList
