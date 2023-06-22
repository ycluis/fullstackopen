import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setUsers } from '../reducers/userReducer'
import { setLogin } from '../reducers/loginReducer'

import userService from '../services/users'

const Users = () => {
  const dispatch = useDispatch()
  const login = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await userService.getAllUsers()
      dispatch(setUsers(users.data))
    }
    fetchAllUsers()
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
    }
  }, [dispatch])

  return (
    <div>
      {login !== null && (
        <>
          <h2>Blogs</h2>
          <p>{login?.username} logged in</p>
          <h3>Users</h3>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>blog created</th>
              </tr>
              {users !== null &&
                users.map((user) => (
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
