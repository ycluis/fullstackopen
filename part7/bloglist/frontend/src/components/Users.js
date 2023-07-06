import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setUsers } from '../reducers/userReducer'
import { setLogin } from '../reducers/loginReducer'
import { Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from '@mui/material'

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
          <Typography variant="h5" style={{ margin: '0.5em' }}>
            Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {users !== null &&
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Button color="inherit" component={Link} to={`/users/${user.id}`}>
                          {user.username}
                        </Button>
                      </TableCell>
                      <TableCell>Blog Created: {user.blogs.length}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <table>
            <tbody>
              <tr>
                <th></th>
                <th>blog created</th>
              </tr>
              {users !== null &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <Button color="inherit" component={Link} to={`/users/${user.id}`}>
                        {user.username}
                      </Button>
                    </td>
                    <td>{user.blogs.length}</td>
                  </tr>
                ))}
            </tbody>
          </table> */}
        </>
      )}
    </div>
  )
}

export default Users
