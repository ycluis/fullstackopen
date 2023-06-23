import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from '../reducers/loginReducer'
import blogService from '../services/blogs'

import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const Menu = () => {
  const login = useSelector((state) => state.login)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setLogin(null))
    blogService.setToken('')
    navigate('/')
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Full Stack Open
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
            {login ? (
              <>
                <Button color="inherit" component={Link}>
                  logged in as: {login.username}
                </Button>
                <Button color="error" variant="contained" size="small" onClick={handleLogout}>
                  logout
                </Button>
              </>
            ) : (
              <Button color="inherit" size="small" component={Link} to="/">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Menu
