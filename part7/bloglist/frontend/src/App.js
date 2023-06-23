import './style/index.css'
import { Routes, Route, useMatch } from 'react-router-dom'
import BlogContainer from './components/BlogContainer'
import Users from './components/Users'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import Menu from './components/Menu'

import { useSelector } from 'react-redux'

const App = () => {
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const userMatch = useMatch('/users/:id')
  const user = userMatch ? (users !== null ? users.find((user) => user.id === userMatch.params.id) : null) : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? (blogs !== null ? blogs.find((blog) => blog.id === blogMatch.params.id) : null) : null

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<BlogContainer />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<UserDetail user={user} />}></Route>
        <Route path="/blogs/:id" element={<BlogDetail blog={blog} />}></Route>
      </Routes>
    </>
  )
}

export default App
