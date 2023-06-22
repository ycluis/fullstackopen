import './style/index.css'
import { Routes, Route, useMatch } from 'react-router-dom'
import BlogContainer from './components/BlogContainer'
import Users from './components/Users'
import UserDetail from './components/UserDetail'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import userService from './services/users'
import { setUserListing } from './reducers/userListReducer'

const App = () => {
  const dispatch = useDispatch()
  const userlist = useSelector((state) => state.userlist)

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await userService.getAllUsers()
      dispatch(setUserListing(users.data))
    }
    fetchAllUsers()
  }, [dispatch])

  const match = useMatch('/users/:id')
  const user = match ? (userlist !== null ? userlist.find((user) => user.id === match.params.id) : null) : null

  return (
    <Routes>
      <Route path="/" element={<BlogContainer />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/users/:id" element={<UserDetail user={user} />}></Route>
    </Routes>
  )
}

export default App
