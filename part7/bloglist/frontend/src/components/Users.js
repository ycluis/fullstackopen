/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { setUserListing } from '../reducers/userListReducer'
import { setUser } from '../reducers/userReducer'

import userService from '../services/users'

const Users = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const userlist = useSelector((state) => state.userlist)

  const match = useMatch('/users/:id')
  const selectedUser = match ? (userlist !== null ? userlist.find((user) => user.id === +match.params.id) : null) : null

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await userService.getAllUsers()
      dispatch(setUserListing(users.data))
    }
    fetchAllUsers()
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  return (
    <div>
      {user !== null && (
        <>
          <h2>Blogs</h2>
          <p>{user?.username} logged in</p>
          <h3>Users</h3>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>blog created</th>
              </tr>
              {userlist !== null &&
                userlist.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </td>
                    <td>{user.blogs.length}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default Users
